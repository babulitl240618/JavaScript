#!/bin/bash
ps -ef | grep nodemon | grep -v grep && sleep 5
if [ $? -eq 0 ]; then
  echo "Hayven server is running and active"
else
  echo "Hayven server is not running and active.. resetting.."
sleep 2
ps -ef | grep node | grep -v grep | awk '{print $2}' | xargs kill -INT
sleep 2
/var/www/html/fchat/cron_run &
fi 
