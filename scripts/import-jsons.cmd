@ECHO off
set database=%1
IF "%1"=="" (
    set database="frontcamp"
)
CALL ECHO %database%
SETLOCAL
FOR /f %%I IN ('dir /b /s .\db\sets\*.json') DO (CALL :callimportf %%~nI, %%I) 
pause
Goto :eof

:callimportf
mongoimport --db %database% --collection %~1 --drop --file %~2
goto:eof