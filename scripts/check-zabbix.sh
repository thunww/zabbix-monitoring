#!/bin/bash

echo "=== Zabbix Server Status ==="
systemctl status zabbix-server

echo ""
echo "=== Zabbix Alerter Processes ==="
ps aux | grep zabbix | grep alerter

echo ""
echo "=== Recent Telegram Logs ==="
sudo tail -50 /var/log/zabbix/zabbix_server.log | grep -i telegram