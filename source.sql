create table config
(
  id int(4) auto_increment not null primary key, 
  value int(4) not null,
  name varchar(50),
  which varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

desc config;

create table event
(
  id int(4) auto_increment not null primary key, 
  userName char(50) not null, 
  type int(4) , 
  eventDesc varchar(50),
  solution varchar(50),
  qq varchar(50),
  otherDesc varchar(50),
  gameType int(4),
  address varchar(50),
  network varchar(50),
  time  datetime  not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

desc event;

create table user
(
  id int(4) auto_increment not null primary key, 
  name char(50) not null, 
  account varchar(50) , 
  password varchar(50),
  role    int(1) not null default 1, 
  joinTime  datetime  not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table user auto_increment =  1000;

desc user;


insert into user (name,account,password,role, joinTime) values('管理员','admin','admin',2, NOW());