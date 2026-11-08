param(
    [int]$Port = 3000
)

$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = (Get-Location).Path }

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".pdf"  = "application/pdf"
}

$ip = [System.Net.IPAddress]::Loopback
$listener = $null

foreach ($p in @($Port, 3001, 8080, 8000, 5000)) {
    try {
        $l = New-Object System.Net.Sockets.TcpListener($ip, $p)
        $l.Start()
        $listener = $l
        $Port = $p
        break
    } catch {
        $listener = $null
    }
}

if (-not $listener) {
    Write-Error "Could not bind to any port."
    exit 1
}

Write-Host "Portfolio server running at http://localhost:$Port/"

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $writer = New-Object System.IO.BinaryWriter($stream)

        $requestLine = $reader.ReadLine()
        if (-not $requestLine) { $client.Close(); continue }

        $parts = $requestLine.Split(" ")
        if ($parts.Length -lt 2) { $client.Close(); continue }

        $path = $parts[1]
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
            $path = "/index.html"
        }
        if ($path.Contains("?")) {
            $path = $path.Substring(0, $path.IndexOf("?"))
        }

        $relPath = [System.Uri]::UnescapeDataString($path).TrimStart('/') -replace '/', '\'
        $filePath = Join-Path $baseDir $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)

            $writer.Write($headerBytes)
            $writer.Write($bytes)
            $writer.Flush()
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($notFound.Length)`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $writer.Write($headerBytes)
            $writer.Write($notFound)
            $writer.Flush()
        }
        $client.Close()
    } catch {
        # ignore client disconnects
    }
}
