if not exist .\db\exports mkdir .\db\exports

@ECHO off
SETLOCAL
FOR /f %%I IN ('dir /b /s .\db\sets\*.*') DO (CALL :callimportf %%~nI, %%I) 
pause
Goto :eof

:callimportf 
mongoexport --db frontcamp --collection %~1 --out .\db\exports\%~1.export.json
goto:eof