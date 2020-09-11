<template>
    <div class="layout-page">
        <Layout class="layout-div">
            <Sider
                ref="side"
                hide-trigger
                collapsible
                :collapsed-width="78"
                :width="256"
                v-model="isCollapsed"
                :class="themeType==='light'?'themeLight':'themeDark'"
            >
                <!--左边栏目logo-->
                <div class="logo" :class="headMaxWidth?'headMaxWidth':''">
                    <img v-if="!isCollapsed && headMaxWidth" :src="maxLogo" alt="">
                    <img v-if="!isCollapsed && !headMaxWidth" :src="logoImg" alt="">
                    <img v-if="isCollapsed" src="../../assets/main/logo-small.png" alt="">
                </div>
                <Menu
                    ref="side_menu"
                    :active-name="activeName"
                    :theme="themeType"
                    width="auto"
                    :class="menuitemClasses"
                    :open-names="openNames"
                    accordion
                    @on-select="menuNav"
                    @on-open-change="open"
                >
                    <template v-for="menu in menuList">
                        <!-- 存在子菜单，此格式只支持二级菜单 -->
                        <template v-if="menu.children">
                            <Submenu :name="menu.name" :key="menu.id" >
                                <template slot="title">
                                    <Icon :type="menu.icon"></Icon>
                                    <span class="titleSpan">{{menu.title}}</span>
                                </template>
                                <MenuItem v-for="child in menu.children" :name="child.name" :key="child.id">
                                    <Icon :type="child.icon"></Icon>
                                    <span>{{child.title}}</span>
                                </MenuItem>
                            </Submenu>
                        </template>
                        <template v-else>
                            <MenuItem :name="menu.name" :key="menu.id">
                                <Icon :type="menu.icon"></Icon>
                                <span>{{menu.title}}</span>
                            </MenuItem>
                        </template>
                    </template>
<!--                    <Submenu v-for="(item,index) in menuList" :key="index" v-if="!isCollapsed && !item.meta.hide && !item.meta.singlePage" :name="item.name">-->
<!--                        <template slot="title" v-if="!isCollapsed">-->
<!--                            <Icon :type="item.meta.icon"></Icon>-->
<!--                            <span class="titleSpan">{{item.meta.title}}</span>-->
<!--                        </template>-->
<!--                        <MenuItem v-if="!isCollapsed && !it.meta.hide" v-for="it in item.children" :key="it.name" :name="it.name">-->
<!--                            <span>{{it.meta.title}}</span>-->
<!--                        </MenuItem>-->
<!--                    </Submenu>-->
<!--                    &lt;!&ndash;只有一个路由&ndash;&gt;-->
<!--                    <MenuItem v-else-if="!isCollapsed && !item.meta.hide && item.meta.singlePage" v-for="it in item.children" :key="index" class="ivu-menu-submenu"-->
<!--                              :class="{ 'liActive': $route.name === it.name}" style="padding: 0!important;" :name="it.name">-->
<!--                    </MenuItem>-->
                </Menu>
                <!-- 侧边栏缩进显示 -->
                <!-- 单页面则Tooltip，包含子菜单则Dropdown -->
                <div class="menu-collapsed" v-show="isCollapsed" :list="menuList">
<!--                    <template v-for="item in menuList">-->
<!--                        <Dropdown ref="dropdown" v-if="item.children" @on-click="handleClick" transfer placement="right-start">-->
<!--                            &lt;!&ndash; 缩小的父级菜单 &ndash;&gt;-->
<!--                            <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}">-->
<!--                                <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"></component>-->
<!--                                <span class="menu-title" v-if="!hideTitle">{{ item.title }}</span>-->
<!--                                <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/>-->
<!--                            </a>-->
<!--                            &lt;!&ndash; 子菜单列表显示 &ndash;&gt;-->
<!--                            <DropdownMenu ref="dropdown" slot="list">-->
<!--                                <template v-for="child in item.children">-->
<!--                                    <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">-->
<!--                                        <component :is="iconType" :size="iconSize" :type="child.icon"></component>-->
<!--                                        <span class="menu-title">{{ child.title }}</span>-->
<!--                                    </DropdownItem>-->
<!--                                </template>-->
<!--                            </DropdownMenu>-->
<!--                        </Dropdown>-->
<!--                        &lt;!&ndash; 后台设计偏少存在主菜单无二级菜单 &ndash;&gt;-->
<!--                        <Tooltip transfer v-else :content="item.title" placement="right" :key="`drop-menu-${item.name}`">-->
<!--                            <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}">-->
<!--                                <component :size="rootIconSize" :color="textColor" :type="item.icon"></component>-->
<!--                            </a>-->
<!--                        </Tooltip>-->
<!--                    </template>-->
                </div>
            </Sider>
            <Layout>
                <!--头部-->
                <Header class="header flexR">
                    <div class="header_left flexR">
                        <!-- 缩小侧边栏按钮 -->
                        <span>
                            <Icon @click.native="collapsedSide" :class="rotateIcon" type="md-menu" size="24"></Icon>
                        </span>
                        <!-- 刷新按钮 -->
                        <span @click="refresh()">
                            <Icon type="ios-refresh" size="24"/>
                        </span>
                        <span>
                            <Breadcrumb>
                                <BreadcrumbItem>首页</BreadcrumbItem>
                                <!--<BreadcrumbItem>{{$route.meta.fuTitle}}</BreadcrumbItem>
                                <BreadcrumbItem v-if="$route.meta.title !== $route.meta.fuTitle">{{$route.meta.title}}</BreadcrumbItem>-->
                            </Breadcrumb>
                        </span>
                    </div>
                    <!--头部右边-->
                    <div class="header_right flexR">
                        <div>
                            <Dropdown trigger="click">
                                <Badge :count="3">
                                    <Icon type="ios-notifications-outline" size="20"/>
                                </Badge>
                                <DropdownMenu slot="list">
                                    <Message></Message>
                                </DropdownMenu>
                            </Dropdown>
                       </div>
                        <div>
                            <Dropdown @on-click="personalSettings">
                                <a href="javascript:void(0)" style="color: #515A6E;">
                                    <img src="https://githup.zengxiaohui.com/vueImg/avatar1.jpg" alt="" class="ivu-avatar ivu-avatar-small"
                                         style="margin-right: 5px">
                                    {{$store.getters.userData.userName}}
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="userCenter">个人中心</DropdownItem>
                                    <DropdownItem name="setting">设置</DropdownItem>
                                    <DropdownItem name="logout" divided>退出登陆</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div @click="optionDrawer = true">
                           <Icon type="md-more" size="20"/>
                        </div>
                    </div>
                </Header>

            </Layout>

        </Layout>
    </div>
    
</template>

<script>

    import {themeData} from '@/config/config'
    import darkImg from '@/assets/main/logo-dark.png'
    import lightImg from '@/assets/main/logo-light.png'

    export default {
        name: "Main",
        data() {
            return {
                isCollapsed: false, // 是否收缩
                themeType: themeData.themeType ? themeData.themeType : 'dark', // 主题风格
                headMaxWidth: themeData.headMaxWidth, // 栏目是否通顶（最大宽度）
                maxLogo: darkImg,
                logoImg: themeData.themeType === 'dark' ? lightImg : darkImg, // 主题logo图片
                activeName: "", // 子导航选中的name
                openNames: [], // 导航打开的父栏目
                menuList: [],
            }
        },
        computed: {
            menuitemClasses() {
                return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
            },
            // 收缩的图标
            rotateIcon() {
                return [ 'menu-icon', this.isCollapsed ? 'rotate-icon' : '']
            }
        },
        methods: {
            // 导航跳转
            menuNav(name) {
                this.routerPush(name)
            },
            // 路由跳转
            routerPush(name) {
                this.$router.push({
                    name: name
                })
                this.$nextTick(() => {
                    let w = document.getElementById('tabsDiv').offsetWidth
                    let zw = document.getElementById('tabsNav').offsetWidth
                    if (w > zw) {
                        this.tabSwitch = true
                    }
                })
            },
            refresh(){

            },
            // 收缩切换
            collapsedSide() {

            },
            personalSettings(){

            },
        }
    }
</script>

<style lang="less">
    @import "main";
</style>