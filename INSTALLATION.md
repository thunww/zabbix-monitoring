# 📦 Zabbix Installation Guide

## Ubuntu/Debian - Zabbix Server Setup

### 1. Install Zabbix Repository

```bash
wget https://repo.zabbix.com/zabbix/7.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_latest_7.0+ubuntu$(lsb_release -rs)_all.deb
sudo dpkg -i zabbix-release_latest_7.0+ubuntu$(lsb_release -rs)_all.deb
sudo apt update
```

### 2. Install Zabbix Server Components

```bash
sudo apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent2 mysql-server -y
```

### 3. Create Database

```bash
sudo mysql -uroot -p
```

```sql
CREATE DATABASE zabbix CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE USER 'zabbix'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON zabbix.* TO 'zabbix'@'localhost';
SET GLOBAL log_bin_trust_function_creators = 1;
FLUSH PRIVILEGES;
QUIT;
```

### 4. Import Database Schema

```bash
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -uzabbix -p zabbix
```

Disable log_bin_trust_function_creators:

```bash
sudo mysql -uroot -p
```

```sql
SET GLOBAL log_bin_trust_function_creators = 0;
QUIT;
```

### 5. Configure Zabbix Server

```bash
sudo nano /etc/zabbix/zabbix_server.conf
```

Edit:

```
DBPassword=your_password
```

### 6. Configure PHP Timezone

```bash
sudo nano /etc/zabbix/apache.conf
```

Uncomment and edit:

```
php_value date.timezone Asia/Ho_Chi_Minh
```

### 7. Start Services

```bash
sudo systemctl restart zabbix-server zabbix-agent2 apache2
sudo systemctl enable zabbix-server zabbix-agent2 apache2
```

### 8. Access Web Interface

```
http://localhost/zabbix
```

**Default credentials:**

- Username: `Admin`
- Password: `zabbix`

---

## Install Zabbix Agent2 on Client Machines

### Ubuntu/Debian

```bash
wget https://repo.zabbix.com/zabbix/7.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_latest_7.0+ubuntu$(lsb_release -rs)_all.deb
sudo dpkg -i zabbix-release_latest_7.0+ubuntu$(lsb_release -rs)_all.deb
sudo apt update
sudo apt install zabbix-agent2 -y
```

### Configure Agent

```bash
sudo nano /etc/zabbix/zabbix_agent2.conf
```

Edit:

```
Server=YOUR_ZABBIX_SERVER_IP
ServerActive=YOUR_ZABBIX_SERVER_IP
Hostname=Kali-server
```

### Start Agent

```bash
sudo systemctl restart zabbix-agent2
sudo systemctl enable zabbix-agent2
```

---

### Check Services

```bash
sudo systemctl status zabbix-server
sudo systemctl status zabbix-agent2
```

---

## Next Steps

After installation:

1. Login to web interface
2. Add hosts to monitor
3. Configure Telegram integration (see main README.md)
4. Create triggers and actions
