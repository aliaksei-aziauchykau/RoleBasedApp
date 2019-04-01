@ECHO off
SETLOCAL
FOR /f %%I IN ('dir /b /s .\db\sets\*.csv') DO (CALL :callimportf %%~nI, %%I) 
pause
Goto :eof

:callimportf
mongoimport --db frontcamp --collection %~1 --type csv --headerline --drop --file %~2
goto:eof