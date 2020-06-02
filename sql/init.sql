CREATE DATABASE link_sharing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER linksharing@localhost IDENTIFIED BY 'linksharing';
GRANT ALL PRIVILEGES ON link_sharing.* TO linksharing@localhost;
