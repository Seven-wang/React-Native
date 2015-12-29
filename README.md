# React-Native-Android Windows安装集成教程详解及实战踩坑

## 前言

随着家大业大的facebook对react-native的持续更新，React Native已经成为现在各大互联网公司相互推崇的技术方案，而对于一个js开发者来说，可以使用javascript来构建应用确实是一件很酷的事情。

Facebook和开源社区对于研发这个框架变的非常严谨，人们开始聚集在Github和Stack Overflow上探讨它，随着React Native for IOS之后，Facebook发布了React Native for Android,把Web和原生平台的javaScript开发技术扩展到了Google的流行移动平台。

### 在Windows下搭建React Native Android开发环境

#### 1.安装JDK

JDK作为JAVA开发的环境，不管是做JAVA开发还是做安卓开发都必须在电脑上安装JDK。从[Java官网下载](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)JDK并安装。请注意选择x86还是x64版本。

将JDK的bin目录加入系统PATH环境变量。具体方法可以参照[JDK安装配置教程](http://jingyan.baidu.com/article/bea41d435bc695b4c41be648.html)，里面非常详细。

#### 2.安装Android SDK

下载地址：[android-sdk](https://dl.google.com/android/android-sdk_r11-windows.zip)

或者直接浏览网页：[网站地址](http://developer.android.com/sdk/index.html)

推荐将SDK的platform-tools子目录加入系统PATH环境变量。

然后按照下图安装SDK中的内容

![](http://ued.corp.elong.com/hexo/react1.png)

![](http://ued.corp.elong.com/hexo/react2.png)

#### 3.安装C++环境

因要同步开发JAVA，所以我们选择eclipse来安装C++环境，编译node.js的C++模块时需要用到。

eclipse[下载地址](http://www.eclipse.org/downloads/)

#### 4.安装node.js

从[官网](http://nodejs.cn/download/)下载node.js的官方4.1版本或更高版本。

#### 5.安装react-native命令行工具

安装方法：

	npm install -g react-native-cli


#### 6.创建项目

进入你要使用的文件夹，初始化项目

	react-native init reactNative

#### 7.前端环境启动

如果有cygwin，在cygwin中进入工程目录，运行

	npm start

DOS可以进入工程目录，运行

	node node_modules\react-native\packager\packager.js

其中你可能会有一些warnings报错，有些是因为在windows下运行mac环境文件，在格式空格上会有一些检查报错，这个直接忽略，如果是这样就是正常的环境，如果出现报错，可以去下方的安装错误问题中查找方法。

![](http://ued.corp.elong.com/hexo/react3.png)

之后打开[http://localhost:8081/index.android.bundle?platform=android](http://localhost:8081/index.android.bundle?platform=android)看是否可以看到打包后的脚本，在packager的命令行可以看到进度条，如果没有查看上方是否有代码报错。

#### 8.模拟器

按照如上的操作，你已经有了react-native的最初始的代码环境，现在需要把它在安卓模拟器上跑起来

虚拟机，现在最流行的模拟器是 genymotion，但是版本的不同会造成各种让你欲仙欲死的奇葩问题，可以在我的百度网盘中下载最纯净版。[下载地址](http://pan.baidu.com/s/1jHmUl9s#path=%252Freact-native-android)

#### 9.安卓调试

安装完genymotion，保持刚才packager开启，另外打开一个命令行，然后在目录下运行

	react-native run-android

出现下图为正确

![](http://ued.corp.elong.com/hexo/react4.png)

![](http://ued.corp.elong.com/hexo/react5.png)


#### 10.React-Native-Android Windows安装错误问题

1.watchman

它开源用来监视文件并且记录文件的改动情况,当文件变更它可以触发一些操作,例如执行一些命令等等,如果项目中提示需要安装的话，网上很难找到windows watchman，可以在[下载地址](http://pan.baidu.com/s/1jHmUl9s#path=%252Freact-native-android)找到，设置PATH环境变量。

2.npm start白屏

显示脚本已经packager过去，并且在URL中可以打开，但是在genymotion中显示白屏，可能的原因有

-- 1).升级node版本

-- 2).设置Dev Settings中的Debug server host for device,将路径设置成localhost或者本地IP，不要加端口号

-- 3).react-native中模块报错，重新安装react-native，执行：

	npm uninstall react-native

	npm install react-native


#### 4.Unable to download JS bundle

-- 1).JS传输未找到，如果在DOS中查看文件正常request过去了，那么先尝试重新启动mpm start，可能由于文件第一次传输报错。

-- 2).设置Dev Settings中的Debug server host for device,将路径设置成localhost或者本地IP，不要加端口号。

-- 3).主要解决方案就是更新 watchman,而windows无法通过命令行更新所以可以尝试上面的方法1直接下载。

#### 5.TypeError: Cannot read property 'root' of null

更新 watchman,而windows无法通过命令行更新所以可以尝试上面的方法1直接下载。[相关链接](https://github.com/facebook/react-native/issues/1875)

#### 11.React-Native运行与书写问题

添加新模块export default时， 需重新编译，否则会找不到
建议规范ES6，ES7书写逻辑，应用import,let,extends,有兴趣的可以直接看[源代码](https://github.com/Seven-wang/React-Native)

里面是我们现在开发项目中的一个典型文件，基本上有初期开发需要的一切实际例子，下面我们来逐行解释，首先是一些代码规范

将

	var React = require('react-native');

书写为

	import React from 'react-native';

相当于引入react-native模块，如果你有其他文件模块的话，也可以定义目录直接引用，这里需要注意的是，react-native是模块化开发项目，每一部分都是一个一个模块，它可以在一个文件下将所有模块一起写入，但是为了开发方便，我们可能需要将大部分的模块分开不同文件使用，所以就需要在某一个文件中引用不同的模块来加载页面，例如

    import Index from './views/Index';
    import Detail from './views/Detail';
    import CityList from './views/CityList';
    import Header from './views/Header';
    import CommonSearchBar from './components/CommonSearchBar';

将

	var { StyleSheet } = React;

书写为

	let { StyleSheet } = React;

let相当于var，具体含义可以查看ES6的新写法，你可以理解为，它是单独针对当前文件的var,上面这句话的含义是引入React里面的StyleSheet(定义样式)，而native与h5书写的区别是，native没有DivP,Span，只有View与Text，可以暂时将View理解成Div，值得注意的是，所有的文字都需要放在Text中才不会报错。并且页面中需要定义的内容都需要在React中引用，比如：

    let {StyleSheet,View,Text,TouchableOpacity,} = React;

将

	var HotelNavBar = React.createClass

书写为

	class HotelNavBar  extends Component

上面定义了一个模块名HotelNavBar，定义名字时候要注意第一个字母必须大写，否则会找不到，每一个模块都会有一个render()方法来输出内容，在render()中会定义一些参数，然后return当前模块的页面结构，所以会有如下书写方式：

    class HotelNavBar extends View {
      render() {
        return (
          <View>
                <Text>hello world!</Text>
          </View>
        );
      }
    }

之后我们需要给HotelNavBar增加一些样式styles，并且给View增加触摸点击效果TouchableOpacity，然后再点击时候onPress出发itemClickHandle方法

    class HotelNavBar extends View {

      itemClickHandle(){
      }

      render() {
        let itemClickHandle = this.itemClickHandle;
        return (
          <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.item}
                    onPress={itemClickHandle.bind(this)}>
                  <View>
                        <Text>abc</Text>
                  </View>
                </TouchableOpacity>
          </View>
        );
      }
    }

    let styles = StyleSheet.create({
      container: {
        backgroundColor: '#f70f49',
        marginBottom: 15,
        flexDirection:'row',
      },
      item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
      }
    });

下面我们来说下react-native如何循环,其中 item是你需要循环的数组,text是你数组中每一个内容，index就是顺序

    {item.map(function(text，index){
      return (
        <Text>{text}</Text>
      );
    })}

最后说下模块与模块之间的传递方式，下面代码的意思是，我们将DetailData.citylist这个数组定义好之后，将它定义为this.state.citylist,并且传递给HotelListView模块，然后在HotelListView中，我只需要调用this.props.citylist就可以调取this.state.citylist的内容。

传递分两种，第一种，引用了TestData中的citylist来传递，第二种定义一个state传递，传递后，只要HotelListView中更改了里面的内容，页面就会更具最新内容进行修改。


    import TestData from '../TestData';

    class Detail extends Component {

      constructor(props, context) {
        super(props, context);

        this.state = {
          citylist: TestData.citylist,
          hotelid: 0
        };
      }
      render() {
        return (
            <HotelListView
                citylist={this.state.citylist}
                hotellist={DetailData.hotellist}
                hotelid={this.state.hotelid}
            />
        );
      }
    }

#### 12.android-gradie

当项目需要集成React-Native-Android时会遇到各种坑，可以查看我同事写得文章，[访问地址](http://blog.csdn.net/jinxjj/article/details/48733983)
