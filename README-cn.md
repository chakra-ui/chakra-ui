<br />

<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui/tree/master/logo">
    <img src="https://github.com/chakra-ui/chakra-ui/blob/master/logo/logo-colored@2x.png?raw=true" alt="chakra-ui symbol" width="300" />
  </a>
</p>

<h1 align="center">快速搭建React应用⚡️</h1>

<br>

<p align="center">
  <img alt="All Contributors" src="https://img.shields.io/github/contributors/chakra-ui/chakra-ui"/>
  <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@chakra-ui/core"/>
  <img alt="MIT License" src="https://img.shields.io/github/license/chakra-ui/chakra-ui"/>
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@chakra-ui/core.svg?style=flat"/>
  <a href="https://spectrum.chat/chakra-ui"><img alt="Spectrum" src="https://img.shields.io/badge/community-spectrum-7A2DFB.svg?style=flat-square" /></a>
  <img alt="Spectrum" src="https://badgen.net/github/last-commit/chakra-ui/chakra-ui" />
  <img alt="Spectrum" src="https://badgen.net/github/stars/chakra-ui/chakra-ui" />
</p>
<br />

查克拉UI提供无障碍、可复用、模块化的React组件，
轻而易举搭建React应用。

## 文档在哪?

在这里 => https://chakra-ui.com

## 功能

- 轻松写样式：查克拉UI提供包括`Box`和`Stack`等布局组件。
  只需定义属性，即可轻松完成样式。
  [了解更多](https://chakra-ui.com/style-props)
- 灵活模块：查克拉UI组件基于React的UI原则，
  可无尽组合。
- 无障碍：查克拉UI组件遵从WAI-ARIA无障碍指南，
  并且拥有正确的`aria-*`属性。
- 深色模式😍：大多数查克拉UI组件适配深色模式。

## 支持查克拉UI💖

你可以捐赠5美元或更多，来支持这个项目的延续。我们由衷感谢您的支持。谢谢你们！🙏 [[捐赠](https://opencollective.com/chakra-ui/contribute)]

#### 个人

<a href="https://opencollective.com/chakra-ui"><img src="https://opencollective.com/chakra-ui/individuals.svg?width=890"></a>

#### 团体

如果作为团体支持我们的项目，我们会在这里附上链有你们网站的标志。 [[捐赠](https://opencollective.com/chakra-ui/contribute)]

<a href="https://opencollective.com/chakra-ui/organization/0/website"><img src="https://opencollective.com/chakra-ui/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/1/website"><img src="https://opencollective.com/chakra-ui/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/2/website"><img src="https://opencollective.com/chakra-ui/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/3/website"><img src="https://opencollective.com/chakra-ui/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/4/website"><img src="https://opencollective.com/chakra-ui/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/5/website"><img src="https://opencollective.com/chakra-ui/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/6/website"><img src="https://opencollective.com/chakra-ui/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/7/website"><img src="https://opencollective.com/chakra-ui/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/8/website"><img src="https://opencollective.com/chakra-ui/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/9/website"><img src="https://opencollective.com/chakra-ui/organization/9/avatar.svg"></a>


## 背书

> 经常有人向我安利各种React组件库和设计系统。
> 但查克拉UI应该是我见过最好用的。
> 它的接口简单、模块化，而且组件的无障碍化也很完善。
>
> 好样的@thesegunadebayo，你的作品很有启发性。 –
> [Ryan Florence](https://twitter.com/ryanflorence/status/1169260008069947392)(react-router创始人)

> @thesegunadebayo创作的新一代开源组件库，超赞。
> 令人印象深刻！ –
> [Colm Tuite](https://twitter.com/colmtuite/status/1169622886052782081)（Modulz创始人）

> 难以置信的佳作。非常出色Segun！ –
> [Lee Robinson](https://twitter.com/leeerob/status/1169330130361159682)(masteringnextjs.com作者)

> 查克拉UI太好用了！
> 我喜欢它一致的聚焦样式和精致的动画效果。 –
> [Guillermo ▲](https://twitter.com/rauchg/status/1169632334389248000)（ZEIT CEO）


## 安装查克拉UI

想使用查克拉UI组件，
你只需安装`@chakra-ui/core`和其依赖包：

```sh
$ yarn add @chakra-ui/core @emotion/core @emotion/styled emotion-theming

# 或者

$ npm install @chakra-ui/core @emotion/core @emotion/styled emotion-theming
```

## 用法

依照以下步骤，使用组件：

1. 用**@chakra-ui/core**提供的`ThemeProvider`包裹你的应用。
   我们推荐你添加`CSSReset`组件，以移除所有浏览器样式。

```jsx
import { ThemeProvider, CSSReset } from "@chakra-ui/core".

// 在应用根文件添加以下代码
const App = ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    {children}
  </ThemeProvider>
);
```

你也可以用`ColorModeProvider`包裹你的应用，
这样你就可以在明亮和深色模式间切换。

2. 现在你就可以这样使用组件了！：

```jsx
import { Button } from "@chakra-ui/core";

<Button>⚡查克拉8万！️</Button>;
```

## 代码沙盒

- JavaScript: https://codesandbox.io/s/chakra-js-starter-lzzg9
- Typescript: https://codesandbox.io/s/chakra-ts-starter-pomi8


## 贡献者

感谢所有贡献者让这个项目长盛不衰。 [[贡献](CONTRIBUTING.md)]

<a href="https://github.com/chakra-ui/chakra-ui/graphs/contributors"><img src="https://opencollective.com/chakra-ui/contributors.svg?width=890&button=false" /></a>
