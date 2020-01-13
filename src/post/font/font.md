---
title: ttt
date: 2018-11-08 04:10:03
tags: [读书12, 《JavaScript权威指南》]
categories: Web 开发可能有些挑战性——我们会提供足够详细的资料来帮助您轻松愉快地学习相关主题。无论您是正在学习 Web 开发的学生（自学或者参与课程），寻找课堂材料的老师，还是编程爱好者，抑或仅仅想对 Web 技术有更多了解，您都能找到您所需要的信息。
test: tset infomation
---
## 配置
springBoot启动必须配置数据源
server.port=8084
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://47.94.21.34:3306/disk
spring.datasource.username=root
spring.datasource.password=soning@mysql
```
### 设置文件上传大小
例如100MB，-1（该值代表无限制）
```
spring.servlet.multipart.max-file-size=-1
spring.servlet.multipart.max-request-size=-1
```
    
### Mybatis 
```
# 包扫描路径  src/main/resources/mapper/*.xml
mybatis.mapper-locations=classpath:mapper/*.xml   
# 开启下划线与驼峰转换
mybatis.configuration.map-underscore-to-camel-case=true
```

## 注解
### @NonNull 
可以标注在方法,字段，参数之上，白哦四对应的值不能为空

### @Nullable 
可以标注在方法，字段，参数之上，表示对那个的值可以为空

### @Bean
> 可复用的JAVA对象，在spring中会被交由Spring管理其生命周期和自动注入，常用在方法上。可指定其初始化或销毁方法，防止销毁可用@Bean(destroyMethod="")

#### Attr
1. `name`="name" || {"name1", "name2"}
2. `initMethod`="FuncName" //指定返回的对象的初始化方法，该方法在返回的对象中
3. `destroyMethod`="FuncName" //指定对象销毁方法

```
public class Foo {
    public void init() { /* initialization logic */ }
}

public class Bar {
    public void cleanup() { /* destruction logic */ }
}

@Configuration
public class AppConfig {

    @Bean(initMethod = "init")
    public Foo foo() { return new Foo(); }

    @Bean(destroyMethod = "cleanup")
    public Bar bar() { return new Bar(); }

}
```

### @Scope("prototype")
#### Attr
1. singleton
单例模式，`singleton`类型的`bean`定义从容器启动到第一次被请求而实例化开始，只要容器不销毁或退出，该类型的`bean`的单一实例就会一直存活。（`Spring`=父母，`Bean`代表独生子女）

2. prototype
原型模式，每次请求都会重新生成一个对象，交由调用方管理并清楚容器对该实例的引用，由请求方自行控制其生命周期。（`Spring`=人贩子，只负责偷（创建）不负责养（管理），`Bean`=被偷的孩子）
该注解有两个值（`singleton`，`prototype`），默认为单例（`Singleton`），和`@Bean`共同使用，标识`Bean`的实例数量

### @Configuration
类似于XML配置文件，用于标识该文件（类）中包含有`Bean`

### @Component,@Service, @Controller, @Mapper, @Repository
组件标识，通常标注在类上，作用同`@Bean`
1. `@Controller` 控制层
2. `@Service` 服务层
3. `@Mapper`, `@Repository` 持久层
4. `@Component` 普通组件

### @ComponentScan("包名")
自动扫描`@Component`，`@Service`等

### @ServletComponentScan("com.demo.包名")
启动类添加`@ServletComponentScan`后，即可在指定包中使用`@WebFilter`,`@WebServlet`,`@WebListener`标注`Servlet`的过滤器和监听器等

### @Controller

#### @RequestMapping(value, method, params, headers, process)
#### @PathVariable
#### @RequestParam
#### @ResponseBody
#### @RequestHeader
#### @CookieValue


### Mybatis注解
### Insert()

### @Options
开启`insert`,`update`完成返回自增主键，传入`entity`对象，自动将`auto_increment`类型主键写入该`Entity`。
```
@Options(useGeneratedKeys=true, keyProperty="fid", keyColumn="fid") 
```
如果方法使用了@Param注解，如：`void insertUser(@Param(“file”) FileEntity file)`，`keyProperty`需要指定为 `file.fid`。


## 全局异常处理类
`@ControllerAdvice` + `@ExceptionHandler`可捕获`@Controller`层的错误,
`@Controller`层无须使用`try-catch`

### @ControllerAdvice 
定义全局异常处理类

### @ExceptionHandler(Exception.class)
声明异常处理方法
如果未声明要处理的异常类型，则默认为定义的方法的参数列表中的的异常类型
```
/**
 * @ControllerAdvice + @ExceptionHandler 实现全局的 Controller 层的异常处理
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 处理所有不可知的异常
     * @param e
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    AppResponse handleException(Exception e){
        LOGGER.error(e.getMessage(), e);

        AppResponse response = new AppResponse();
        response.setFail("操作失败！");
        return response;
    }

    /**
     * 处理所有业务异常
     * @param e
     * @return
     */
    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    AppResponse handleBusinessException(BusinessException e){
        LOGGER.error(e.getMessage(), e);

        AppResponse response = new AppResponse();
        response.setFail(e.getMessage());
        return response;
    }
}
```
## 数据校验
### @NotNull、@Min、@NotBlank 、、、
变量级注解，声明变量校验类型

注解 | 说明
---|---
@Null | 只能是null
@Null | 限制只能为null
@NotNull | 限制必须不为null
@NotEmpty|验证注解的元素值不为null且不为空（字符串长度不为0、集合大小不为0）
@NotBlank|验证注解的元素值不为空（不为null、去除首位空格后长度为0），不同于@NotEmpty，@NotBlank只应用于字符串且在比较时会去除字符串的空格
@AssertFalse|制必须为false
@AssertTrue|限制必须为true
@Max(value)|限制必须为一个不大于指定值的数字
Min(value)|限制必须为一个不小于指定值的数字
@Digits(integer,fraction)|限制必须为一个小数，且整数部分的位数不能超过integer，小数部分的位数不能超过fraction
@Future|限制必须是一个将来的日期
@Past|限制必须是一个过去的日期
@Size(max,min)|限制字符长度必须在min到max之间
@Length	| 被注释的字符串的大小必须在指定的范围内
@Range(min=, max=)|验证注解的元素值在最小值和最大值之间
@Email|验证注解的元素值是Email，也可以通过正则表达式和flag指定自定义的email格式
@CreditCardNumber|信用卡验证
@Pattern(regexp="reg") | 验证字符串满足正则
@URL|(protocol=,host=, port=,regexp=, flags=)

### @Validated @Valid

区别|@Validated | @Valid
---|---|---
特有   | 分组                 | 嵌套验证
作用于 | 类型、方法和方法参数 | 方法、构造函数、方法参数和成员属性 

### @Validated分组机制
`@Validated`提供分组机制，在参数有多种验证情景下（如添加和修改），对应不同的验证机制

1. 提供分组接口标识
```
public interface Add{ }
public interface Update{ }
```
2. 验证注解上标明所属分组
```
public class User{
    @NotNull(message = "id不能为空", groups = { Update.class })
    private int id;
    
    @NotNull(message = "用户名不能为空", groups = { Add.class, Update.class })
    @Size(min = 3, max = 12, groups = { Update.class })
    private String username;
    
}
```
3. `@Controller`上进行验证
BindingResult
@Validated/@Valid和BindingResult 是配对出现，并且形参顺序是固定的（一前一后）。
```
public String save(@Validated({Add.class}) User user, BindingResult result){
    if(result.hasErrors()){
        return "validate occurrenced error"
    }
    return "validate success"
}
```
### @GroupSequence({interface.class, other.class})
默认分组验证时无序的，如果想要分组排序需要使用`@GroupSequence`
```
/* @interface */
@GroupSequence( { Add.class, Update.class })
public interface Group { }

/* @Controller */
public @ResponseBody String addPeople(@Validated({Group.class}) People p,BindingResult result)   {  
	if(result.hasErrors())  {  
		return "0";  
	}  
	return "1";  
} 

```
### 嵌套验证
如果某个入参是复合对象（对象包含对象，例如学生含有班级的相关对象信息），只使用`@Validated`无法对学生中的班级对象的属性进行验证
```
public class Student{
    @NotNull(message = "学生姓名不能为空")
    private String name;
    
    ...
    
    @NotNull(message = "班级信息不能为空")
    private Classes classes;
}

public class Classes{
    @NotNull(message = "班级ID不能为空")
    @Min(value = 1, message = "id必须为正整数")
    private int id;
}
```
此时验证只会对第一层有效（学生），对班级内的验证会忽略.
`@Valid` 则可以声明嵌套验证，将`@Valid`写在需验证的对象即可
```
public class Student{
    @NotNull(message = "学生姓名不能为空")
    private String name;
    
    ...
    @Valid //@Valid 可以用在成员属性上 @Validated不能
    @NotNull(message = "班级信息不能为空")
    private Classes classes;
}
```

### ResponseEntity

## 文件上传
### 设置文件上传大小
例如100MB，-1（该值代表无限制）
```
spring.servlet.multipart.max-file-size=-1
spring.servlet.multipart.max-request-size=-1
```
或者使用工厂函数，放在启动类中
```
    /**  
     * 文件上传配置  
     * @return  
     */  
    @Bean  
    public MultipartConfigElement multipartConfigElement() {  
        MultipartConfigFactory factory = new MultipartConfigFactory();  
        //文件最大  
        factory.setMaxFileSize("10240KB"); //KB,MB  
        /// 设置总上传数据总大小  
        factory.setMaxRequestSize("102400KB");  
        return factory.createMultipartConfig();  
    } 
```
### 获取文件MD5
`DigestUtils.md5DigestAsHex(new FileInputStream(File));`




