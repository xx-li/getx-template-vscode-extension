import * as changeCase from "change-case";
import { existsSync, lstatSync, writeFile } from "fs";

export function entityTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/entity.dart`;
  const template = `class ${pascalCaseName}Entity {
  ${pascalCaseName}Entity();
  factory ${pascalCaseName}Entity.fromJson(Map<String, dynamic> json) =>
      ${pascalCaseName}Entity();
}
`;

  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      template,
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve;
      }
    );
  });
}

export function requestTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/request.dart`;
  const template = `import 'package:network/network.dart';
import 'package:base_request/base_request.dart';

class ${pascalCaseName}Request extends BaseRequest {
  final int id;

  ${pascalCaseName}Request(this.id);

  @override
  RequestMethod requestMethod() {
    return RequestMethod.Get;
  }

  @override
  Future requestArgument() async {
    return null;
  }

  @override
  String requestUrl() {
    return "path?id=$id";
  }
}

// class ${pascalCaseName}Request extends BaseRequest {
//   final int pageNum;
//   final int pageSize;
//   final String? name;

//   ${pascalCaseName}Request(this.pageNum, this.pageSize, {this.name});

//   @override
//   RequestMethod requestMethod() {
//     return RequestMethod.Get;
//   }

//   @override
//   Future requestArgument() async {
//     return null;
//   }

//   @override
//   String requestUrl() {
//     var url = "path?pageNum=$pageNum&pageSize=$pageSize";
//     if (name != null) {
//       url += "&name=$name";
//     }
//     return url;
//   }
// }
  
`;

  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      template,
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve;
      }
    );
  });
}

export function logicTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/logic.dart`;
  const template = `import 'package:get/get.dart';
import 'package:utils/utils.dart';

import 'package:garbage_recycling_app/common/base_page/base_page_logic.dart';

import 'request.dart';
import 'entity.dart';

class ${pascalCaseName}Logic extends ViewNormalLogic<${pascalCaseName}Entity> {
  /// 成员变量

  int? id;

  /// 生命周期

  ${pascalCaseName}Logic() {
    var args = intFromAny(Get.parameters['id']);
    args ??= intFromAny(Get.arguments);

    if (args != null) {
      id = args;
    } else {
      viewState = ViewState.error;
    }
  }

  @override
  void onReady() {
    super.onReady();

    initData();
  }

  /// 请求数据

  @override
  Future<${pascalCaseName}Entity?> loadData() async {
    if (id == null) {
      throw const FormatException("找不到设备id");
    }
    final request = ${pascalCaseName}Request(id!);
    final result = await request.start();
    final model = ${pascalCaseName}Entity.fromJson(result.data);
    return model;
  }

  /// 事件

}


// class ${pascalCaseName}Logic extends ViewListLogic<${pascalCaseName}Entity> {
//   /// 成员变量

//   int? id;

//   /// 生命周期

//   ${pascalCaseName}Logic() {
//     var args = intFromAny(Get.parameters['id']);
//     args ??= intFromAny(Get.arguments);

//     if (args != null) {
//       id = args;
//     } else {
//       viewState = ViewState.error;
//     }
//   }

//   @override
//   void onReady() {
//     super.onReady();

//     setup(pageSize: 10, initialRefresh: true);
//   }

//   /// 请求数据

//   @override
//   Future<List<${pascalCaseName}Entity>> loadData({required int pageNum}) async {
//     final request = ${pascalCaseName}Request(pageNum, pageSize);
//     var result = await request.start();
//     totalCount = result.total;
//     List<dynamic> list = result.data ?? [];
//     final modelList = list.map((e) => ${pascalCaseName}Entity.fromJson(e)).toList();
//     return modelList;
//   }


//   /// 事件

// }
`;

  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      template,
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve;
      }
    );
  });
}

export function componentsTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/components.dart`;
  const template = `// 当前模板自定义UI组件放在这里
import 'package:flutter/material.dart';

import 'package:garbage_recycling_app/common/widget/widget_extension.dart';

import 'entity.dart';

class ${pascalCaseName}Cell extends StatelessWidget {
  final ${pascalCaseName}Entity entity;
  final GestureTapCallback onTap;
  const ${pascalCaseName}Cell({Key? key, required this.entity, required this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container().cellStyle(ontap: onTap, height: null);
  }
}
`;

  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      template,
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve;
      }
    );
  });
}

export function pageTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const routeName = pascalCaseName.replace(pascalCaseName[0], pascalCaseName[0].toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/page.dart`;
  const template = `import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

import 'package:garbage_recycling_app/common/base_page/base_page.dart';
import 'package:garbage_recycling_app/common/widget/widget_factory.dart';

import 'logic.dart';
import 'components.dart';

// 路由相关代码生成在这里，复制到指定文件
// /// 路由注释说明
// static const ${routeName} = "/${routeName}";
// 
// GetPage(
//   name: Routes.${pascalCaseName},
//   page: () => ${pascalCaseName}Page()),

class ${pascalCaseName}Page extends StatelessWidget {
  ${pascalCaseName}Page({Key? key}) : super(key: key);

  final logic = Get.put(${pascalCaseName}Logic());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: WidgetFactory.navigationBar("请填写标题", elevation: 0),
        body: GetBuilder<${pascalCaseName}Logic>(
          builder: (logic) => BasePage(
              viewState: logic.viewState,
              refresh: logic.requestRefresh,
              noramlWidge: const Center(child: Text("请添加页面内容"))),
        ));
  }
}

// class ${pascalCaseName}Page extends StatelessWidget {
//   ${pascalCaseName}Page({Key? key}) : super(key: key);

//   final logic = Get.put(${pascalCaseName}Logic());

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//         appBar: WidgetFactory.navigationBar("请填写标题", elevation: 0),
//         body: GetBuilder<${pascalCaseName}Logic>(
//           builder: (logic) => BasePage(
//               viewState: logic.viewState,
//               refresh: logic.requestRefresh,
//               noramlWidge: SmartRefresher(
//                 controller: logic.refreshController,
//                 enablePullDown: true,
//                 enablePullUp: logic.list.isNotEmpty,
//                 onRefresh: logic.requestRefresh,
//                 onLoading: logic.requestLoadMore,
//                 child: ListView.separated(
//                   itemCount: logic.list.length,
//                   itemBuilder: (context, index) {
//                     final entity = logic.list[index];
//                     return ${pascalCaseName}Cell(
//                         entity: entity,
//                         onTap: () {
//                           _onTapCell(index);
//                         });
//                   },
//                   separatorBuilder: (context, index) {
//                     return WidgetFactory.textCellSepLine();
//                   },
//                 ),
//               )),
//         ));
//   }

//   void _onTapCell(int index) {}
// }
`;

  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      template,
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve;
      }
    );
  });
}