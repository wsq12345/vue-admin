import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: '../../static/user.png',
    name: '管理员'
  },
	{
		id: 2,
		username: 'wsq',
		password: '123456',
		avatar: '../../static/user.png',
		name: '李某某'
	}
];

const Users = [];
var Birth;
for (let i = 0; i < 100; i++) {
	Birth=Mock.Random.date();
  Users.push(Mock.mock({ //随机创建用户
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),  //Mock.Random.province 生成随机地址
    birth: Birth,
		age: new Date().getFullYear()-Birth.toString().substr(0,4)+1,
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
