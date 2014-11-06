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
  platAccount varchar(50),
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



insert into config (value, name, which) values (1001,'主播工具问题','type');
insert into config (value, name, which) values (1002,'用户卡顿问题','type');
insert into config (value, name, which) values (1003,'用户黑屏问题','type');
insert into config (value, name, which) values (1004,'其他','type');
insert into config (value, name, which) values (1005,'运营问题','type');



insert into config (value, name, which) values (10,'LOL','gameType');
insert into config (value, name, which) values (11,'Dota2','gameType');
insert into config (value, name, which) values (12,'CS','gameType');
insert into config (value, name, which) values (13,'三国杀','gameType');
insert into config (value, name, which) values (14,'war3','gameType');
insert into config (value, name, which) values (15,'Dota','gameType');


insert into config (value, name, which) values (1,'电信','network');
insert into config (value, name, which) values (2,'联通','network');
insert into config (value, name, which) values (3,'移动','network');
insert into config (value, name, which) values (4,'铁通','network');
insert into config (value, name, which) values (5,'其他','network');
