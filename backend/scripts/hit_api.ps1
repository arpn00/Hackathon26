$ErrorActionPreference = 'Continue'
function Hit($m, $u, $b) {
    $r = Invoke-WebRequest -Uri $u -Method $m -ContentType 'application/json' -Body $b -SkipHttpErrorCheck
    Write-Host "$m $u -> $($r.StatusCode)"
    Write-Host $r.Content
    Write-Host ''
}
Hit 'Post' 'http://localhost:8000/resolve' '{"caseNumber":"0000000000000000"}'
Hit 'Get'  'http://localhost:8000/resolve/nope' $null
Hit 'Post' 'http://localhost:8000/feedback' '{"experiment":"case_km","runId":"run-123","rating":5,"note":"spot on"}'
Hit 'Post' 'http://localhost:8000/feedback' '{"experiment":"case_km","runId":"r","rating":9}'
Hit 'Post' 'http://localhost:8000/resolve' '{"caseNumber":""}'
