# React-Router 指南

React Router 是 React 的路径导航 的 package。 哪里有 react ，哪里就可以使用 react router。无论是在 node.js ，在 web， 还是在 React Native 中。

react router 适用于 **React >= 16.8**

## [1.]Installation

在你的 react 项目中，（可以使用 `npx create-react-app your-app-name`, your-app-name 为你要创建的项目的名称，也可以使用 `./` 在当前目录下创建)

使用 `npm` 包管理工具来安装 react router dependencies:

```npm
cd your-app-name

npm install react-router-dom@6 // react-router-dom 是为web端提供的依赖，@6 是安装的版本
```

现在先创建一个 App 组件：

```jsx
export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
    </div>
  );
}
```

跟react 一样，也需要渲染dom

```jsx
import {render} from 'react-dom'
import App from './App';

const rootElement = document.getElementById('root');
render(<App/>, rootElement);
```

最后开启项目：

```
npm start

# 两者之一

npm run dev
```

这样就可以使用 react-router啦

## [2.]Connect the URL

首先，如果想要使用 router 来管理页面，需要先将组件挂载在 路由下，有两种方式将组件和路由链接：

- `BrowserRouter`
- `HashRouter`

`<BrowserRouter>` 是web 端推荐使用是接口。

## [3.] Add Some Links

导入 `Link` 链接。相当于 `<a>` 标签，用户点击链接跳转。

```jsx
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}
```

`Link`  中的 `to` 属性，相当于 路径，与 路由中的path属性相对应。如果两者匹配，这完成跳转。

## [4.] Add Some Routes

创建两个组件：

- `src/routes/invoices.jsx`
- `src/routes/expenses.jsx`

```jsx
export default function Expenses() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Expenses</h2>
    </main>
  );
}
```

```jsx
export default function Invoices() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
```

进行导航设置：

```jsx
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
```

- <BrowserRouter>告诉 web  使用 router 接口
- <Routes>` and `<Route> 是路由渲染组件的主要方法。
  - 可以看成 `if`  语句。 `if `  `path` 和 `to` 的值匹配。则渲染 `element`.
  - 当 location 发生改变时，<Routes>  会寻找它的所有 `children`:<Route> element, 来找到一个最佳匹配并且渲染 该分支的UI。(<Route> 可能含有嵌套， 所以 Parent routes 渲染时，需要 [`Outlet`](https://reactrouter.com/docs/en/v6/api#outlet))

> path属性， 和to属性匹配时跳转；
>
>  element 属性表示，跳转后显示的组件

## [5.] Nested Routes

react 中，组件一般都有嵌套，react-router也可以，完成路由嵌套需要两件事情：

- 将routes 写在 组件中，
- 渲染 一个 `<OutLet>`

首先，嵌套路由，现有两个兄弟路由 expenses 和 invoices ，将其设为 App 的 子路由：

```jsx
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
```

当一个路由有子路由时，会做两件事：

1. 嵌套 URLs(`"/" + "expenses"` and `"/" + "invoices"`)
2. 当子路由的路径匹配时，将嵌套 UI 组件于共享的layout 中。

**但是：这两件事只有在 父组件中 渲染 `Outlet` 才有效**

```jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

## [6.] Listing the Invoices

路由组件和普通组件一样可以遍历，使用于请求数据之后，现在有一假数据from `src/data.js`:

```js
let invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: "12/05/1995",
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "$8,000",
    due: "10/31/2000",
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "$9,500",
    due: "07/22/2003",
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "$14,000",
    due: "09/01/1997",
  },
  {
    name: "Wide Open Spaces",
    number: 1998,
    amount: "$4,600",
    due: "01/27/1998",
  },
];

export function getInvoices() {
  return invoices;
}
```

现在开始在 invoices route 中使用。

```jsx
import { Link } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

## [7.] Adding a "No Match" Route

路径并不是每次都能匹配，可以当所有的路径都不匹配时，可以设置一个 报错路由; 比如 有一个 link 指向 ：`/incoices/123`:

```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

`path = "*"`, 中的 `*` 有者特殊的意义： **当其他的路由都不匹配时，才匹配。**

## [8.] Reading URL Params

现在将目光放在 invoice URLs 上，添加一个特殊的 invoice组件，当我们访问链接 如： `"/invoices/1998"` 或  `"/invoices/2005"`,  就渲染下面的组件：

```jsx
export default function Invoice() {
  return <h2>Invoice #???</h2>;
}
```

我们想渲染 invoice number  来 替代 `"?"`.

在普通组件中，我们需要通过props 来传递：`<Invoice invoiceId="123" />,` 但是，你无法控制数据，因为它来自 URL.

现在创建一个新的 `<Route>` 在 “invoices” route 中，如：
```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes
```

有几件事需要注意：

- `path=":invoicedId"` , 使用的是 dynamic segment(动态) ，即从 `:` 开始，后面的 value 将会成为一个 prop 发送到 匹配的组件。意味着：它可以匹配任何value ，只要是相同的模式就行。
- `<Route>` 添加一个第二层路由嵌套，匹配时：`<App><Invoices><Invoice /></Invoices></App>`. 因为路由嵌套时， UI 也嵌套。

同时，别忘了在父路由中添加 `<Outlet>`:
```jsx
import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

最后一步，在 invoice 组件中从URL:中接收 `:invoiceId` 参数：

```jsx
import { useParams } from "react-router-dom";

export default function Invoice() {
  let params = useParams();
  return <h2>Invoice: {params.invoiceId}</h2>;
}
```

> useParams hook 返回一个 key/value 対 的对象，动态参数是path和URL 匹配的值。 

> 所以：变量 params 中的 key 与 路径中 `:` 之后的 `invoiceId` 是相同的
>
> ：invocieId -->  params.invoiceId

## [9.] Index Routes

```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        }
      />
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

index route 中没有 `path`,  因为 `index ` 代替了 `path`. **因为 index route 与 父组件共享 `path`.**

也可以理解为：

- index routes 是以父路由的路径渲染的子路由
- 当父路由匹配但所有子路由不匹配时，index routes  匹配
- index routes 是 父路由的默认子路由
- 当用户还没有点击 其中一个子路由时，显示 index routes 

 ## [10.] Active Links

显示 Links 是否被激活，这很正常。我们可以将 `Link` 换成 `NavLink`

```jsx
import { NavLink, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

传递function：

```jsx
// normal string
<NavLink className="red" />

// function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```

 

`<NavLink>`  是一个特殊的 `Link` ,可以确定是否被激活。

默认情况下，被激活时，一个 `active` class 会添加到 `NavLink` 组件。

或者，可以传递 内联样式，或 className ，根据active 状态来自定义样式。

或者，通过function 作为 其 子组件的内容。

## [11.] Search Params

Search Params 与 URL params 很像，但是在 URL 中的位置却不同。有别与不同地URL 通过  `/` 分隔; 

Search Params 是以 结尾处`?`。

正如web 中 URL  like:`"/login?success=1"`  或  `"/shoesbrand=nike&sort=asc&sortby=price"`

Serach Params 需要通过一个 hook `useSearchParams` 来实现。与 `useState` 用法十分相似。但是是在 URL 中搜索参数中存储和设置状态。

例子：
```jsx
import {
  NavLink,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

> `get()` 方法返回某个 `Map` 对象中的一个指定元素。



随着用户的输入：

- `setSearchParams()` 将 `?filter=...` search param 放入 URL 然后重新渲染 路由。
- `useSearchParams`现在返回一个 [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) with `"filter"`  作为其中之一的值
- 我们将输入的值设置为过滤器搜索参数中的任何内容（就像`useState`但在 URLSearchParams 中！）
- 我们根据过滤器搜索参数过滤我们的发票列表。



## [12.] Custom Behavior 自定义行为

`useLocation`  如果您想在当前位置更改时执行一些副作用，这可能很有用。

## [13.]  Navigating Programmatically 以编程方式导航



最后。。。



















 