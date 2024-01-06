https://stackoverflow.com/questions/38497334/how-to-run-html-file-on-localhost

https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system


Go live

1> Have Node.js installed in your system.

2> In CMD, run the command npm install http-server -g

cd frontend
3> Navigate to the specific path of your file folder in CMD and run the command http-server

4> Go to your browser and type localhost:8081. Your Application should run

PowerShell:
Set-ExecutionPolicy RemoteSigned

Set-ExecutionPolicy Restricted


// website layout plan
1. landing page (login and register)
2. dashboard (show assignments)