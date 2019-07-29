<template>
	<div id="login">
		<div class="form-container">
			<h2>用户登录</h2>
			<el-form label-position="top" :model="formData" :rules="rules" ref="formData">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="formData.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password" type="password"></el-input>
				</el-form-item>
				<el-button class="login-btn" type="success" @click="submitForm('formData')" :loading="logining">登录</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
			name: "login",
			data() {
				return {
					logining:false,
					formData:{
						username:"",
						password:"",
					},
					rules:{
						username:[
							{required:true,message:'请输入用户名',trigger:'blur'},
							{min:3,max:10,message:'用户名长度需在3-10个字符之间',trigger:'blur'}
						],
						password:[
							{required:true,message:'请输入密码',trigger:'blur'},
							{min:6,message:'密码长度至少6个字符',trigger:'blur'}
						]
					}
				}
			},
			methods:{
				submitForm(FormData){
					this.$refs[FormData].validate((valid)=>{
						if(valid){
							this.logining=true;
							var loginParams = { username: this.formData.username, password: this.formData.password };
							requestLogin(loginParams).then(data=>{
								this.logining=false;
								let {msg,code,user}=data;
								if(code!==200){
									this.$message({
										message:msg,
										type:'error'
									});
									this.formData.username="";
									this.formData.password="";
								}else{
									sessionStorage.setItem('user',JSON.stringify(user));
									this.$router.push({ path: '/table' });
								}
							})
						}
						else{
							//console.log('error');
							return false;
						}
					})
				}

			}
  }

</script>

<style lang="scss" scoped>
		#login{
			height: 100%;
			background: url(../assets/bg1.jpg) no-repeat;
			background-size: cover;
			display: flex;
			justify-content: center;
			align-items: center;
			.form-container{
				background: #1F2D3D;
				width: 500px;
				text-align: center;
				padding: 40px;
				border-radius: 20px;
				box-sizing: border-box;
				.login-btn{
					width: 100px;
				}
			}
		}
</style>