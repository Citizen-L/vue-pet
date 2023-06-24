<template>
    <div class="footer">
		<div class="mainbar container">
			<div>电话：123456789</div>
			<div>邮箱：123456789@qq.com</div>
		</div>
  </div>
</template>

<script>
	export default {
		name: 'Footer',
		data () {
		return {}
		}
	}
</script>

<style scoped>
.footer {
  width: 100%;
  min-height: 5em;
  margin-top: 10em;
  background: orange;
  color: white;
}
.mainbar {
  display: flex;
  justify-content: center;
}
.mainbar div{
  margin-left: 20px;
  font-size: 14px;
}
</style>