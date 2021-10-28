# 说明

fork以便于修改成自定义的getx模板。

## 使用方式
 1. 安装依赖: yarn
 2. 安装打包的库: npm i vsce -g
 3. 打包成vsix文件: vsce package
 4. 通过vsix文件本地安装插件


## 模板定义分析

以`test_plugin`文件名为例

1. 文件的命名方式是`page`还是`test_plugin_page`好？
`page`命名的方式，进入文件夹后，就可以清晰的找到目标，不会被其它字符干扰，也更加简洁。
2但是在使用`../../page.dart`类型的方式引入时，是看不到具体引入了什么文件。 但是`test_plugin_page`
的方式可以。 
另外VSCode中全局搜索文件的时候，`page`不好搜索到具体内容。
结论： 使用`test_plugin_page`命名的方式。引入其它模块内文件，以`package`方式引入

2. 是否需要`index`文件export全部的dart文件?
使用index可以同时import模块的全部文件，但是实际使用一般只要引入view文件，所以定义为不使用index文件。
另外模板内，如果某个文件里面引入index，那么就会冗余引入，实际按需引入更好。
结论： 不使用`index`文件

3. 是否需要state?
使用state能拆分逻辑和数据，结构更加的清晰。但是在简单页面，不拆分逻辑和数据放在一起也清晰，拆分需要文件间跳转和部分胶水代码，增加复杂度。
但是模板化开发，行为最好一致。 复杂项目可以要求按标准使用state。简单项目统一不使用state。
结论：简单项目不使用`state`，复杂项目使用`state`

4. 是否需要创建一个`components`的子文件夹放子组件？
模板文件夹内文件数目并不多，每一类的一个，但是直接放在同一个文件夹层级就好了，避免文件夹切换浪费时间。
如果是复杂页面，需要创建多个子组件，那么创建`components`才有意义。简单页面不创建子文件即可，一个`components`文件里面也可以写多个子组件。
结论：不创建`components`子文件夹，复杂页面自己手动创建子文件夹。

###  模板文件结构
.
├── components.dart     // 子组件 
├── entity.dart         // 页面对应的接口数据model
├── logic.dart          // 处理数据和页面逻辑
├── page.dart           // 页面视图
└── request.dart        // 对应接口的封装

## GetxController生命周期说明

```dart
    /// 生命周期

  ///在 widget 内存中分配后立即调用。
  ///你可以用它来为控制器初始化 initialize 一些东西。
  @override
  void onInit() {
    super.onInit();
    // new 对象
    // 初始静态数据
  }

  ///在 onInit() 之后调用 1 帧。这是进入的理想场所
  ///导航事件，例如 snackbar、对话框或新route，或
  ///async 异步请求。
  @override
  void onReady() {
    super.onReady();
    // async 拉取数据
  }

  ///在 [onDelete] 方法之前调用。 [onClose] 可能用于
  ///处理控制器使用的资源。就像 closing events 一样，
  ///或在控制器销毁之前的流。
  ///或者处置可能造成一些内存泄漏的对象，
  ///像 TextEditingControllers、AnimationControllers。
  ///将一些数据保存在磁盘上也可能很有用。
  @override
  void onClose() {
    super.onClose();
    // 1 stop & close 关闭对象
    // 2 save 持久化数据
  }

  ///dispose 释放内存
  @override
  void dispose() {
    super.dispose();
    // dispose 释放对象
  }
```