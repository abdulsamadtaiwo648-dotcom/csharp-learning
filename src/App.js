import React, { useState, useEffect } from "react";
import { Home, Moon, Sun, CheckCircle2, Eye, EyeOff, AlertCircle, ChevronRight, Play, RefreshCw, Copy, Check, BookOpen } from "lucide-react";

const DARK = { bg: "#0E1116", surface: "#171B22", raised: "#1F2430", border: "#272E3A", text: "#ECEEF2", dim: "#8A93A3", faint: "#565F70", go: "#3FD6C4", cs: "#A78BFA", signal: "#FFB454", danger: "#F26D6D", success: "#34C759" };
const LIGHT = { bg: "#F7F5F0", surface: "#FFFFFF", raised: "#F1EEE6", border: "#E3E0D6", text: "#1B1E24", dim: "#6B7280", faint: "#9CA3AF", go: "#0F8F80", cs: "#6D4FD1", signal: "#B36A00", danger: "#C23636", success: "#07A642" };

try {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify({}));
  }
} catch (e) {
  console.error("Storage init error:", e);
}

const COURSES = {
  "csharp-fundamentals": {
    title: "C# Fundamentals",
    section: "Beginner",
    color: "#3FD6C4",
    lessons: [
      {
        id: "variables-and-var",
        title: "Variables and the var Keyword",
        duration: "25 min",
        content: "Understanding Variables in C#\n\nVariables are containers for storing data values. Every variable in C# has a type that specifies what kind of data it can hold. When you create a variable, you're reserving a piece of memory to store information that your program will use while it runs. This is one of the most fundamental concepts in programming because almost everything your code does involves variables in some way.\n\nExplicit Type Declaration\n\nThe traditional way to declare variables in C# is to explicitly state the type. This means writing out exactly what type of data the variable will store. For example, if you write int age, you're telling the compiler that the variable named age will store an integer value. This explicit declaration is very clear and leaves no ambiguity about what the variable contains.\n\nWhen you use explicit types, you gain several advantages. The compiler can check your code more carefully to ensure you're not accidentally putting the wrong type of data into a variable. If you try to store text into an integer variable, the compiler will catch this error before your program even runs. This is called type safety, and it prevents many common bugs.\n\nThe Traditional Approach in Action\n\nImagine you're building a program for a bank. You might declare variables for account balance, customer age, and account number. With explicit types, you write each one precisely. The balance might be a decimal because it needs to store money accurately. The age would be an integer because ages don't have fractional parts. The account number might also be an integer or possibly a long if it could be very large. Each variable's type communicates its purpose to anyone reading your code.\n\nIntroducing the var Keyword\n\nC# provides a powerful shortcut called the var keyword. Instead of explicitly writing the type, you can write var and let the compiler figure out what type the variable should be based on the value you're assigning to it. This is called type inference. When you write var name = \"Alice\", the compiler sees the string \"Alice\" on the right side and automatically determines that name should be a string variable.\n\nMost importantly, var is NOT the same as dynamic typing. The variable still has a specific type; it's just determined at compile time rather than explicitly written out. Once the compiler decides that a variable is a string, it remains a string for the entire program. You cannot later assign a number to it. The type checking is still very strict.\n\nWhy Use var?\n\nThe main reason developers use var is readability and conciseness. When working with complex types, especially in modern C#, the explicit type name can become very long and repetitive. For instance, if you're working with a dictionary of customer records, writing out the full type name repeatedly makes code harder to read. The var keyword lets you focus on what the variable represents rather than its technical type.\n\nvar is also useful when you're using LINQ or other modern C# features that return complex types. Sometimes the return type is so specific and long that writing it out would actually make the code harder to understand. In these cases, var makes your code clearer and easier to maintain.\n\nBest Practices with var\n\nDevelopers have discovered that var works best when the type is obvious from context. If you write var total = CalculateTotal(), it's immediately clear that total holds whatever CalculateTotal returns, and the full type name would just add noise. However, if you write var x = 5, it's less clear what you intend this variable to be used for.\n\nThe C# community has developed guidelines for when to use var. Use it when the type is clear from the right side of the assignment. Use it with LINQ queries where types are complex. Use it with the new keyword when instantiating objects. But avoid it in cases where the type isn't obvious, because other developers reading your code need to understand what type each variable holds without having to look at multiple definitions.\n\nComparison with Go's Type System\n\nFor Go developers transitioning to C#, the var keyword might feel familiar because Go also supports type inference with the := operator. However, there are important differences. Go's type inference is more aggressive and accepts more situations where the type might be ambiguous. C#'s var is more conservative and only works when the compiler can definitively determine the type at compile time. This makes C# safer and more predictable.\n\nIn Go, you might write x := someFunction() and the type is inferred from whatever someFunction returns. C# works the same way with var, but C# is stricter about ensuring the return type is always the same. Go allows implicit interface implementation, while C# requires explicit declarations, which affects how var works with interfaces.\n\nThe Role of Type Safety\n\nC# was designed with type safety as a core principle. This is why var doesn't actually reduce type safety; it just makes the type checking happen at compile time instead of being written in the source code. Every variable still has exactly one type, and that type never changes during the program's execution. The compiler verifies this strictly.\n\nThis type safety prevents whole categories of bugs. Your program will never accidentally put a customer name into an age field, or a credit card number into a discount percentage field. The compiler prevents these mistakes before your program even starts running.",
        task: {
          title: "Variables and var Keyword Quiz",
          description: "Test your understanding of variables and the var keyword:",
          questions: [
            "What does the var keyword do in C#?",
            "Is var the same as dynamic typing? Explain.",
            "When should you use var instead of explicit types?",
            "Can a var variable change its type during program execution?",
            "Why is var useful in LINQ queries?",
            "How does C# var compare to Go's type inference?"
          ],
          expectedAnswers: [
            ["type inference", "compiler determines type"],
            ["no", "explicit type", "static", "compile time"],
            ["obvious", "complex types", "readability", "linq"],
            ["no", "fixed", "compile time"],
            ["complex", "long names", "readability", "clear"],
            ["similar", "go uses", "inference", "stricter"]
          ]
        },
        codeExample: "using System;\n\nclass Program {\n    static void Main() {\n        // Explicit types\n        int age = 30;\n        string name = \"Alice\";\n        double salary = 50000.50;\n        \n        // Using var - compiler infers type\n        var city = \"New York\";\n        var yearsExperience = 5;\n        var bonus = 5000.00;\n        \n        Console.WriteLine(name + \" is \" + age);\n        Console.WriteLine(\"Type of city: \" + city.GetType());\n    }\n}"
      },

      {
        id: "data-types-deep-dive",
        title: "Understanding Data Types",
        duration: "30 min",
        content: "The Foundation of Data Storage\n\nWhen you write a C# program, every piece of information your program works with must be stored somewhere in the computer's memory. The data type determines how that information is stored, how much space it takes, and what operations you can perform on it. Understanding data types is absolutely essential because they're the foundation of everything you'll build.\n\nValue Types vs Reference Types\n\nC# divides all data types into two fundamental categories: value types and reference types. This distinction is one of the most important concepts in C#, and it affects how your program behaves in subtle but important ways.\n\nValue types store data directly in memory. When you create an integer variable and assign it the value 42, that number 42 is stored directly in the memory location associated with that variable. When you pass a value type to a method, the actual value gets copied. If a method receives a copy of that integer and modifies it, the original integer in your calling code remains unchanged.\n\nReference types, by contrast, don't store data directly. Instead, they store a reference, which is like an address pointing to where the actual data lives. When you create a string variable and assign it text, the variable doesn't store the text directly. Instead, it stores an address that points to where the text is actually stored in memory. When you pass a reference type to a method, you're passing the address, not a copy of the data. This means the method can modify the actual object, and those modifications affect the original.\n\nNumeric Types\n\nC# provides several types for storing numbers, each designed for different purposes and with different ranges. The byte type stores whole numbers from zero to 255. It's the smallest integer type and uses minimal memory, making it useful for data where you know values will be small. The short type holds whole numbers in a larger range, from about negative thirty thousand to positive thirty thousand. It's useful for cases where you need a wider range than byte but don't need as much range as int.\n\nThe int type is the most common integer type. Most whole numbers you work with will be stored as integers. It holds values from about negative two billion to positive two billion. This range is sufficient for most everyday programming needs. The long type provides an enormous range, holding values in the quadrillions, making it suitable for applications that need to count very large quantities.\n\nFor numbers with decimal points, C# offers float, double, and decimal. The float type stores approximate decimal values using less memory. It's useful for scientific calculations where absolute precision isn't critical. The double type is more precise than float and uses twice as much memory. Most decimal calculations in C# use double because the extra precision usually justifies the memory cost.\n\nThe decimal type is special because it stores decimal numbers precisely, without rounding errors. This makes it essential for financial calculations where accuracy is paramount. If you're storing money amounts, always use decimal, never float or double. Money calculations require absolute precision, and the other types introduce rounding errors that might seem small but compound over thousands of transactions.\n\nBoolean Type\n\nThe bool type stores true or false values. These might seem simple, but boolean values are essential for controlling program flow. Whenever your program needs to make a decision, it uses a boolean to represent that choice. Boolean values are used in if statements, while loops, and other control structures that determine what your program does.\n\nString Type\n\nThe string type represents text. Strings in C# are sequences of characters and are reference types, stored on the heap rather than directly in the variable. This means strings are mutable in terms of reassignment but technically immutable in terms of their content. When you concatenate strings or modify them, you're actually creating new string objects, not modifying the original.\n\nNull and Default Values\n\nEvery data type in C# has a default value. For numeric types, the default is zero. For boolean, the default is false. For reference types like strings, the default is null, which represents \"no object.\" Null is a special value indicating the absence of an object, and it's crucial for representing cases where a variable hasn't been assigned a value or intentionally has no value.\n\nNullable Types\n\nSometimes you need a variable that can hold either a value or null. Nullable types allow this. You can create a nullable integer by writing int?, which holds either an integer value or null. This is particularly useful in database scenarios where a field might not have a value for a particular record. Nullable types force you to explicitly check whether a value is null before using it, preventing null reference errors.\n\nType Conversion and Parsing\n\nOften you'll need to convert data from one type to another. C# provides several ways to do this. Implicit conversion happens automatically when there's no risk of data loss. For example, converting an int to a long is safe because long can hold any value that int can hold.\n\nExplicit conversion, called casting, is required when data loss is possible. If you convert from long to int, values outside the int range will be truncated. Casting uses parentheses: (int)myLongVariable converts a long value to int. The TryParse method provides a safe way to convert strings to other types. Instead of throwing an exception if conversion fails, TryParse returns a boolean indicating success or failure, and if successful, provides the converted value.\n\nChoosing the Right Type\n\nPart of writing good C# code is choosing the right data type for each variable. This isn't just about correctness; it's about clarity and performance. If you know a variable will only hold small values, using byte instead of int makes your intent clear to other developers. If you're working with money, using decimal instead of double prevents serious bugs. If you need a collection of items, choosing the right collection type affects your program's performance.",
        task: {
          title: "Data Types Comprehension",
          description: "Demonstrate your understanding of C# data types:",
          questions: [
            "Explain the difference between value types and reference types.",
            "Why should you use decimal for money instead of double?",
            "What is null and when would you use it?",
            "Describe the difference between casting and TryParse.",
            "Which numeric type should you use for very large numbers?",
            "What is a nullable type and why is it useful?",
            "Explain implicit vs explicit type conversion."
          ],
          expectedAnswers: [
            ["value direct", "reference address", "copy", "heap"],
            ["precision", "accurate", "rounding errors", "financial"],
            ["no object", "absence", "unassigned"],
            ["casting exception", "tryparse safe", "boolean"],
            ["long", "quadrillions"],
            ["nullable", "null check", "optional value"],
            ["implicit automatic", "explicit casting", "loss"]
          ]
        },
        codeExample: "using System;\n\nclass DataTypes {\n    static void Main() {\n        // Value types\n        int count = 100;\n        double temperature = 98.6;\n        bool isActive = true;\n        \n        // Reference types\n        string message = \"Hello, C#\";\n        string nullValue = null;\n        \n        // Nullable types\n        int? optionalNumber = null;\n        int? anotherNumber = 42;\n        \n        // Type conversion\n        string input = \"123\";\n        if (int.TryParse(input, out int result)) {\n            Console.WriteLine(\"Parsed: \" + result);\n        }\n        \n        // Decimal for money\n        decimal price = 19.99m;\n        decimal total = price * 2;\n        \n        Console.WriteLine(\"All types demonstrated\");\n    }\n}"
      }
    ]
  },

  "methods-functions": {
    title: "Methods and Functions",
    section: "Fundamentals",
    color: "#A78BFA",
    lessons: [
      {
        id: "method-basics",
        title: "Creating and Using Methods",
        duration: "28 min",
        content: "What Are Methods?\n\nMethods are blocks of code that perform a specific task. Instead of writing the same code over and over, you write it once in a method and then call that method whenever you need that functionality. Methods are fundamental to writing organized, maintainable code. They let you break complex problems into smaller, manageable pieces.\n\nThink of a method like a recipe in a cookbook. The recipe describes the steps to make a dish. Once you've written the recipe, you don't have to write out all the steps every time you want to make that dish. You just follow the recipe. Similarly, once you've written a method, you don't rewrite the code. You call the method.\n\nMethod Structure and Components\n\nEvery method in C# has several essential parts. First comes the access modifier, which determines who can call this method. Usually this is public for methods meant to be used by other code, or private for methods used only within the class. Then comes the return type, which specifies what the method will give back to whoever calls it.\n\nNext is the method name, which should clearly describe what the method does. Method names in C# follow the convention of starting with a capital letter and using Pascal case, where each word begins with a capital letter. Good names are essential for readability. A method named CalculateTotalPrice is much clearer than a method named CalcTP or even just Process.\n\nInside the parentheses comes the parameter list. Parameters are pieces of information the method needs to do its job. A method that calculates the total cost of a purchase would need to know the price and quantity as parameters. If the method doesn't need any information, the parameter list is empty.\n\nFinally, the method body is the code inside the curly braces that actually performs the work.\n\nReturn Types and Returning Values\n\nWhen a method finishes its work, it can return a value to whoever called it. The return type specifies what kind of value will be returned. If you write public int CalculateAge, the method promises to return an integer. Inside the method, you use the return keyword followed by an integer value. That value gets passed back to the code that called the method.\n\nSome methods don't need to return anything. These methods use the void return type. A method declared as public void PrintMessage doesn't return a value. It performs an action, like printing something to the screen, but doesn't send any data back to the caller.\n\nParameters and Arguments\n\nParameters are like placeholders for information the method will use. When you define a method, you list the parameters it needs. When you actually call that method, you provide values called arguments. The parameter is the definition, and the argument is the actual value you provide.\n\nC# supports several ways of passing parameters. By default, parameters are passed by value, meaning a copy of the value is passed to the method. If the method modifies the parameter, the original value outside the method remains unchanged. This is safe and prevents accidental modifications.\n\nYou can use the ref keyword to pass parameters by reference. This means the method receives the actual variable, not a copy. If the method modifies a ref parameter, the original variable is modified. This is useful when you want a method to modify a variable in the calling code.\n\nThe out keyword is used for parameters that the method will set values for. When you pass a variable as an out parameter, you're telling the method \"I have this variable, and you should set its value.\" This is common for methods that return multiple values, or for methods that signal success or failure while also returning a value.\n\nOptional Parameters\n\nC# allows you to make parameters optional by providing default values. Instead of requiring the caller to provide every parameter, you can specify what value a parameter should use if the caller doesn't provide one. This makes methods more flexible and easier to use. For example, a method that sends an email could have an optional subject line with a default value like \"No Subject\".\n\nMethod Overloading\n\nMethod overloading is a powerful feature that allows you to create multiple methods with the same name but different parameters. The compiler can tell them apart based on the number, types, and order of parameters. For example, you might have one CalculateTotal method that takes two numbers and another that takes three numbers. When code calls CalculateTotal, the compiler automatically uses the version that matches the provided arguments.\n\nThis is more powerful than it might first appear. It lets you provide a consistent interface to calling code. Callers can call CalculateTotal without worrying about which specific version exists. The compiler picks the right one. This makes your API more intuitive and flexible.\n\nPure Functions and Side Effects\n\nThe best methods are pure functions. A pure function always produces the same output for the same input and doesn't modify anything outside the method. A method that takes two numbers and returns their sum is a pure function. It always returns the same sum for the same two numbers, and calling it doesn't change anything elsewhere in the program.\n\nMethods that modify external state, like modifying a class variable or writing to a file, have side effects. Side effects aren't always bad, but they make code harder to understand and test. Well-written code minimizes side effects and concentrates behavior in clear, predictable methods.\n\nRecursion\n\nMethods can call themselves, a technique called recursion. Each time a method calls itself, it must work toward a base case that stops the recursion. Without a base case, the method would call itself infinitely, causing a stack overflow. Recursion is elegant for solving certain types of problems, like traversing tree structures or calculating factorials, but it should be used carefully.",
        task: {
          title: "Methods and Functions Practice",
          description: "Test your understanding of methods:",
          questions: [
            "What is the purpose of a method in programming?",
            "Explain the difference between parameters and arguments.",
            "What does the return type tell us about a method?",
            "When would you use void as a return type?",
            "Explain the difference between pass by value and pass by reference.",
            "What is method overloading and why is it useful?",
            "What is a pure function and what are its characteristics?"
          ],
          expectedAnswers: [
            ["reusable", "block", "code", "task"],
            ["parameter definition", "argument value", "placeholder"],
            ["what returns", "output", "type"],
            ["no return", "action", "void"],
            ["value copy", "reference actual", "ref keyword"],
            ["same name", "different parameters", "overload"],
            ["pure same output", "no side effects", "deterministic"]
          ]
        },
        codeExample: "using System;\n\nclass MethodExamples {\n    // Simple method with return\n    public static int Add(int a, int b) {\n        return a + b;\n    }\n    \n    // Method with void return\n    public static void PrintGreeting(string name) {\n        Console.WriteLine(\"Hello, \" + name);\n    }\n    \n    // Method with optional parameter\n    public static decimal CalculateTotal(decimal price, int quantity = 1) {\n        return price * quantity;\n    }\n    \n    // Method overloading\n    public static void Display(int value) {\n        Console.WriteLine(\"Integer: \" + value);\n    }\n    \n    public static void Display(string value) {\n        Console.WriteLine(\"String: \" + value);\n    }\n    \n    static void Main() {\n        Console.WriteLine(Add(5, 3));\n        PrintGreeting(\"Alice\");\n        Console.WriteLine(CalculateTotal(19.99m, 2));\n        Display(42);\n        Display(\"Hello\");\n    }\n}"
      },

      {
        id: "advanced-methods",
        title: "Advanced Method Concepts",
        duration: "32 min",
        content: "Method Parameters in Depth\n\nWhen you pass information to a method, understanding how that information is handled is critical. In C#, the default behavior is pass by value. This means the method receives a copy of the data. If you modify that copy inside the method, the original variable outside the method is unaffected. This protects your data from accidental modifications and makes methods safer to use.\n\nHowever, sometimes you want a method to be able to modify a variable in the calling code. This is where the ref keyword becomes useful. When you use ref, you're passing a reference to the actual variable, not a copy. Inside the method, you can modify the variable, and the change persists after the method returns. Using ref requires explicit keyword usage both when defining the method and when calling it, making it very clear what's happening.\n\nThe out keyword is specifically designed for methods that need to provide output. Unlike ref, which assumes the variable already has a value, out is used when you're initializing a variable through the method. You declare the variable as out when calling the method, and the method fills it with a value. This is commonly used with TryParse methods that need to indicate both success and provide a converted value.\n\nLambda Expressions and Inline Methods\n\nModern C# supports lambda expressions, which are compact ways to create small, anonymous methods. Lambda expressions are defined using the arrow operator and are particularly useful when passing functionality to other methods. A simple lambda might look like (int x) => x * 2, which is an unnamed function that takes an integer and returns it doubled.\n\nLambda expressions become powerful when used with LINQ or with methods that accept function parameters. Instead of defining a named method just to use it once, you can write a lambda expression inline. This reduces boilerplate code and makes your intentions clear.\n\nExtension Methods\n\nExtension methods let you add new methods to existing types without modifying the type itself. This is tremendously useful because it lets you extend built-in types like string or int with custom functionality. An extension method is defined as a static method in a static class, with the first parameter preceded by the this keyword.\n\nFor example, you could add a method to the string type that counts the number of vowels in the string. This extension method would then be available on every string variable in your code. From the caller's perspective, it looks like a normal method called on a string, even though you added it yourself. Extension methods are particularly useful in LINQ, where they extend collections with query capabilities.\n\nGeneric Methods\n\nGeneric methods are methods that work with any type, keeping type safety. Instead of writing separate methods for int, string, and other types, you can write one generic method that works with all of them. Generic methods use angle brackets to specify type parameters. A generic method might be declared as public T GetFirst<T>(T[] array), which works with an array of any type and returns an element of that type.\n\nGenerics are powerful because they eliminate code duplication while maintaining type safety. The compiler checks that you're using the type correctly, even though the method works with unknown types.\n\nNamed Arguments\n\nWhen calling a method with multiple parameters, you can specify which argument goes to which parameter by name. Instead of relying on position, you write parameterName: value. Named arguments make method calls more readable and less error-prone, especially for methods with many parameters. They also allow you to call methods with parameters in a different order than they're defined.\n\nVariable Scope and Lifetime\n\nWhere a variable is declared determines where it can be used. Variables declared inside a method are only accessible within that method. They come into existence when the method is called and cease to exist when the method returns. Variables declared at the class level are accessible throughout the class.\n\nUnderstanding scope prevents bugs and helps organize code logically. A variable should be declared in the smallest scope where it's needed. This reduces the chance of accidental modifications and makes code easier to understand.\n\nMethod Documentation\n\nC# supports XML documentation comments that describe what methods do. These comments begin with /// and include tags that describe parameters, return values, and exceptions. Good documentation helps other developers understand how to use your methods and what to expect.",
        task: {
          title: "Advanced Method Concepts Quiz",
          description: "Test advanced method knowledge:",
          questions: [
            "Explain when you should use the ref keyword.",
            "What is the difference between ref and out parameters?",
            "What is a lambda expression and when would you use it?",
            "How do extension methods work?",
            "What are generic methods and why are they useful?",
            "Explain the concept of variable scope.",
            "Why use named arguments in method calls?"
          ],
          expectedAnswers: [
            ["modify variable", "pass reference", "change"],
            ["ref has value", "out initialize", "different"],
            ["anonymous function", "inline", "arrow"],
            ["add method", "existing type", "static"],
            ["work any type", "generic", "reusable", "type safe"],
            ["where accessible", "lifetime", "visibility"],
            ["readability", "clarity", "order"]
          ]
        },
        codeExample: "using System;\n\nclass AdvancedMethods {\n    // Method with ref parameter\n    public static void Increment(ref int value) {\n        value = value + 1;\n    }\n    \n    // Method with out parameter\n    public static bool TryDivide(int a, int b, out int result) {\n        if (b == 0) {\n            result = 0;\n            return false;\n        }\n        result = a / b;\n        return true;\n    }\n    \n    // Generic method\n    public static void PrintArray<T>(T[] items) {\n        foreach (var item in items) {\n            Console.WriteLine(item);\n        }\n    }\n    \n    static void Main() {\n        int x = 5;\n        Increment(ref x);\n        Console.WriteLine(\"After increment: \" + x);\n        \n        if (TryDivide(10, 2, out int quotient)) {\n            Console.WriteLine(\"Result: \" + quotient);\n        }\n        \n        int[] numbers = { 1, 2, 3 };\n        PrintArray(numbers);\n    }\n}"
      }
    ]
  },

  "classes-objects": {
    title: "Classes and Objects",
    section: "Core Concepts",
    color: "#FF6B6B",
    lessons: [
      {
        id: "classes-fundamentals",
        title: "Classes, Fields, and Properties",
        duration: "30 min",
        content: "Understanding Classes\n\nClasses are blueprints for creating objects. A class defines what data an object holds and what actions it can perform. When you create a class, you're not creating an object yet. You're defining the structure and behavior that objects of that class will have. Once the class is defined, you can create as many objects of that class as you need.\n\nThink of a class like an architectural blueprint for a house. The blueprint describes what the house should look like and what features it has. But the blueprint itself isn't a house. When construction workers use the blueprint to build an actual house, that's an object. You can build many houses from the same blueprint, and each house is an object.\n\nFields vs Properties\n\nFields are the simplest way to store data in a class. A field is a variable declared directly in the class. Anyone who has access to an object can read and modify its fields. However, direct access to fields is generally discouraged in professional C# code because it lacks control. If you need to validate data before it's stored, or if you need to perform actions when data is accessed, fields don't provide that capability.\n\nProperties provide a better approach. A property is a controlled way to access data. From outside the class, a property looks like a field. You access it the same way. But internally, a property consists of a getter and setter that control how data is accessed and modified. This gives you tremendous flexibility.\n\nIn the getter, you can perform calculations or transformations before returning a value. In the setter, you can validate data before allowing it to be stored. If someone tries to set an age to a negative number, you can reject it. If someone tries to set a price to a value that would bankrupt the company, you can prevent it.\n\nAuto Properties and Initialization\n\nC# provides a convenient shorthand called auto properties. When you just want to store and retrieve a value without additional logic, you can write a property in a single line. The compiler automatically creates a hidden field and implements the getter and setter for you. This removes boilerplate code while still providing the abstraction layer that properties offer.\n\nFor even simpler initialization, C# supports object initializers. Instead of calling a constructor and then setting properties, you can set multiple properties in curly braces when creating an object. This is more concise and often more readable than traditional initialization.\n\nConstructors\n\nA constructor is a special method called automatically when you create a new object. Constructors allow you to set up the object in a valid initial state. Many objects require certain information to be meaningful. A Person object needs a name. A BankAccount needs a balance and an owner. Constructors enforce that this necessary information is provided.\n\nConstructors have the same name as the class. They don't have a return type. You can have multiple constructors with different parameters, a technique called constructor overloading. This allows different ways of creating objects depending on what information is available.\n\nConstructor chaining allows one constructor to call another constructor. This reduces code duplication when you have multiple constructors with overlapping initialization logic. The this keyword, when used with parentheses and parameters, calls another constructor in the same class.\n\nEncapsulation and Access Modifiers\n\nEncapsulation is the practice of hiding internal implementation details and exposing only what's necessary. Access modifiers control what can access class members. Public members are accessible from anywhere. Private members are only accessible within the class. Internal members are only accessible within the same assembly.\n\nEncapsulation protects your objects from invalid states. If a class has a field that must always be positive, you wouldn't make it public. You'd make it private and expose a property with validation. This ensures the field never holds an invalid value.\n\nStatic Members\n\nUsually, each object has its own copy of fields and properties. But sometimes you want data or behavior shared across all instances of a class. Static members belong to the class itself, not to individual objects. A static field is shared by all objects. A static method can be called without creating an object.\n\nFor example, you might have a static counter in a Person class that tracks how many Person objects have been created. When you create a new Person, this counter increments. The counter is shared across all Person objects, so it represents the total count of people ever created.\n\nReadonly Fields and Constants\n\nC# provides ways to make data immutable. A readonly field can be set once and never changed. It's often set through the constructor. A constant is similar but its value must be known at compile time and is fixed forever. These help prevent bugs by ensuring certain data doesn't accidentally get modified.\n\nThe Dispose Pattern\n\nSome objects use resources like file handles or database connections that must be properly released when the object is no longer needed. The Dispose pattern provides a standard way to handle cleanup. A class implements the IDisposable interface and provides a Dispose method that releases these resources. Using a using statement ensures Dispose is called automatically.",
        task: {
          title: "Classes and Objects Quiz",
          description: "Test your understanding of classes:",
          questions: [
            "What is the difference between a class and an object?",
            "Explain why properties are better than public fields.",
            "What is the purpose of a constructor?",
            "What does encapsulation mean?",
            "When would you use a static field?",
            "What is the difference between readonly and constant?",
            "Explain auto properties."
          ],
          expectedAnswers: [
            ["class blueprint", "object instance", "template"],
            ["validation", "control", "getter setter", "logic"],
            ["initialize", "setup", "valid state", "required data"],
            ["hide", "expose", "control access", "details"],
            ["shared", "all instances", "count"],
            ["readonly once", "constant compile", "immutable"],
            ["shorthand", "auto implement", "getter setter"]
          ]
        },
        codeExample: "using System;\n\npublic class BankAccount {\n    // Field (not recommended for public use)\n    private decimal balance;\n    \n    // Properties with auto-implementation\n    public string AccountNumber { get; set; }\n    public string Owner { get; set; }\n    \n    // Property with validation\n    public decimal Balance {\n        get { return balance; }\n        private set { balance = value; }\n    }\n    \n    // Static field\n    private static int accountCount = 0;\n    \n    // Constructor\n    public BankAccount(string accountNumber, string owner, decimal initialBalance) {\n        AccountNumber = accountNumber;\n        Owner = owner;\n        balance = initialBalance;\n        accountCount++;\n    }\n    \n    // Method\n    public void Deposit(decimal amount) {\n        if (amount > 0) balance += amount;\n    }\n    \n    public static int GetAccountCount() {\n        return accountCount;\n    }\n}\n\nclass Program {\n    static void Main() {\n        var account = new BankAccount(\"123456\", \"Alice\", 1000);\n        Console.WriteLine(account.Owner);\n        account.Deposit(500);\n    }\n}"
      }
    ]
  },

  "inheritance-polymorphism": {
    title: "Inheritance and Polymorphism",
    section: "Core Concepts",
    color: "#4ECDC4",
    lessons: [
      {
        id: "inheritance-basics",
        title: "Understanding Inheritance",
        duration: "28 min",
        content: "The Concept of Inheritance\n\nInheritance is one of the core pillars of object-oriented programming. It allows you to create a hierarchy of classes where child classes inherit features from parent classes. When you have multiple classes that share common behavior, inheritance lets you capture that common behavior in a base class and avoid code duplication.\n\nImagine you're building a program for an animal shelter. You have classes for Dog, Cat, and Bird. All these animals share certain behaviors like eating, sleeping, and making sounds. Instead of writing these common behaviors in each class, you create a base Animal class with these shared behaviors. Then Dog, Cat, and Bird classes inherit from Animal, automatically getting all that shared behavior.\n\nBase Classes and Derived Classes\n\nThe class that is inherited from is called the base class or parent class. The class that does the inheriting is called the derived class or child class. A derived class gets all the public and protected members of its base class. It can use these members as if they were its own.\n\nC# uses the colon syntax to indicate inheritance. When you write public class Dog : Animal, you're declaring that Dog inherits from Animal. A class can have only one direct base class, but that base class can have its own base class, creating a chain of inheritance.\n\nProtected Access\n\nAccess modifiers take on new meaning with inheritance. Public members are accessible everywhere. Private members are only accessible within the class, not even in derived classes. Protected members are accessible within the class and in any derived classes. This allows derived classes to access important internal data while still hiding it from the outside world.\n\nBase Class Method Calls\n\nDerived classes often want to extend the behavior of base class methods rather than completely replace them. The base keyword allows you to call the base class version of a method. For example, a Dog class might inherit a Speak method from Animal but want to extend it. The Dog version might call the base Speak method and then add dog-specific behavior.\n\nConstructor Inheritance\n\nDerived classes have their own constructors. When a derived class constructor runs, it must initialize the base class. You use the base keyword with parentheses to call the base class constructor. This ensures the base class part of the object is properly initialized before the derived class adds its own initialization.\n\nVirtual Methods and Overriding\n\nWhen a base class method is marked virtual, derived classes can override it to provide their own implementation. A method marked virtual is saying \"I provide a default implementation, but derived classes might want to do something different.\" When overriding a virtual method, you use the override keyword. This tells the compiler and other developers that you're intentionally replacing the base class implementation.\n\nWhen you call a virtual method on an object, the actual method that runs depends on the type of the object, not the type of the variable holding it. If you have an Animal variable that actually holds a Dog object, calling a virtual Speak method will call the Dog version, not the Animal version. This is the essence of polymorphism.\n\nAbstract Classes\n\nSometimes a base class exists only as a template and shouldn't be instantiated directly. An abstract class can't be instantiated, only inherited from. Methods in an abstract class can be abstract, meaning they have no implementation. Derived classes must provide implementations for these abstract methods.\n\nAbstract classes are powerful because they define an interface that derived classes must implement while providing default implementations for some methods. They're perfect for representing concepts that shouldn't exist on their own, like \"Vehicle.\" You wouldn't create a Vehicle object directly. You'd create specific types like Car or Truck.\n\nSealing Classes\n\nSometimes you want to prevent further inheritance. If a class is well-designed and complete, allowing inheritance might break its invariants. The sealed keyword prevents inheritance of a class. You can also seal individual methods to prevent overriding even if the class can be inherited.\n\nInheritance vs Composition\n\nInheritance represents an \"is-a\" relationship. A Dog is-a Animal. Composition represents a \"has-a\" relationship. An Employee has-a Address. Modern C# style often favors composition over inheritance because it's more flexible. With composition, you can change behavior at runtime. With inheritance, the class hierarchy is fixed at compile time.\n\nMultiple Inheritance through Interfaces\n\nC# doesn't support multiple inheritance of classes because it creates ambiguity. However, you can implement multiple interfaces, which provides many benefits of multiple inheritance without the problems.",
        task: {
          title: "Inheritance Concepts Quiz",
          description: "Test your understanding of inheritance:",
          questions: [
            "What is the difference between a base class and a derived class?",
            "Explain the protected access modifier.",
            "Why would you mark a method as virtual?",
            "When would you use an abstract class?",
            "Explain constructor chaining in inheritance.",
            "What does it mean to override a method?",
            "Describe the difference between 'is-a' and 'has-a' relationships."
          ],
          expectedAnswers: [
            ["parent child", "inherit", "base derived"],
            ["accessible class", "derived classes", "not public"],
            ["allow override", "polymorphism", "subclass"],
            ["template", "not instantiate", "define interface"],
            ["base constructor", "initialization", "this"],
            ["replace", "virtual", "new implementation"],
            ["inheritance", "composition", "has-a"]
          ]
        },
        codeExample: "using System;\n\npublic abstract class Animal {\n    public string Name { get; set; }\n    \n    protected Animal(string name) {\n        Name = name;\n    }\n    \n    public virtual void Eat() {\n        Console.WriteLine(Name + \" is eating\");\n    }\n    \n    public abstract void Speak();\n}\n\npublic class Dog : Animal {\n    public Dog(string name) : base(name) {\n    }\n    \n    public override void Eat() {\n        base.Eat();\n        Console.WriteLine(\"Wagging tail\");\n    }\n    \n    public override void Speak() {\n        Console.WriteLine(Name + \" barks: Woof!\");\n    }\n}\n\npublic class Cat : Animal {\n    public Cat(string name) : base(name) {\n    }\n    \n    public override void Speak() {\n        Console.WriteLine(Name + \" meows: Meow!\");\n    }\n}\n\nclass Program {\n    static void Main() {\n        Animal dog = new Dog(\"Buddy\");\n        Animal cat = new Cat(\"Whiskers\");\n        \n        dog.Speak();\n        cat.Speak();\n        dog.Eat();\n    }\n}"
      }
    ]
  },

  "interfaces-abstraction": {
    title: "Interfaces and Abstraction",
    section: "Core Concepts",
    color: "#95E1D3",
    lessons: [
      {
        id: "interfaces-deep-dive",
        title: "Creating and Using Interfaces",
        duration: "32 min",
        content: "Understanding Interfaces\n\nAn interface is a contract that specifies what methods and properties a class must have without specifying how they should be implemented. Think of it like an agreement. When you sign a contract to buy a house, you're agreeing to certain terms. The contract doesn't tell you how to get the money. It just specifies what you must deliver.\n\nInterfaces define capabilities. They say \"if you want to be a Drawable object, you must have a Draw method.\" Multiple unrelated classes can implement the same interface. A Circle, Square, and Image can all implement Drawable even though they're completely different.\n\nWhy Interfaces Matter\n\nInterfaces enable loose coupling, which is essential in large programs. Instead of classes depending on each other directly, they depend on interfaces. This makes code more flexible and easier to test. If you need to change how something works, you can swap implementations without changing code that uses them.\n\nInterfaces enable polymorphism without inheritance. You can have unrelated classes that share a common interface. This is powerful because it lets you write code that works with many different types as long as they implement the interface.\n\nDefining Interfaces\n\nAn interface definition starts with the interface keyword. Interface names typically begin with I to distinguish them from classes. An interface can contain method signatures without bodies, property definitions, and event definitions. Everything in an interface is implicitly public.\n\nInterface members don't have implementations. They're just declarations of what must exist. When a class implements an interface, it must provide concrete implementations for all interface members.\n\nImplementing Interfaces\n\nWhen a class implements an interface, it uses a colon just like inheritance. A class can implement multiple interfaces, separated by commas. Implementing an interface is a contract. The class promises to provide implementations for every member defined in the interface. If it doesn't, the code won't compile.\n\nAll interface members must be public in the implementation. You can't make an interface member private. This ensures that whatever capability the interface promises is genuinely available.\n\nInterface Segregation\n\nA principle of good design is interface segregation. This means making interfaces focused and specific rather than broad and general. Instead of one huge interface with thirty methods, create multiple small interfaces, each defining a specific capability.\n\nWhen a class implements a specific interface, it's making a promise about that specific capability. Classes that only need that capability depend only on that interface. This makes code more maintainable because changes to unrelated functionality don't affect code that doesn't use it.\n\nMultiple Interface Implementation\n\nC# allows a class to implement multiple interfaces. This is one of the most powerful features of interfaces. A single class can promise to fulfill multiple contracts. For example, a Document class might implement ISerializable to promise it can be saved, IComparable to promise it can be compared to other documents, and ICloneable to promise it can be copied.\n\nWhen working with a class that implements multiple interfaces, you can access different members depending on which interface reference you use. This flexibility is incredibly valuable in large programs.\n\nExplicit Interface Implementation\n\nSometimes you implement an interface but want to hide its implementation. Explicit interface implementation lets you implement interface members in a way that's only accessible through an interface reference, not through the class directly. This is useful when an interface's behavior conflicts with the class's normal behavior or when you want to keep the interface implementation hidden.\n\nInterface Inheritance\n\nInterfaces can extend other interfaces. An interface can inherit from one or more other interfaces, combining their requirements. A class implementing the derived interface must implement everything from both interfaces.\n\nInterface vs Abstract Class\n\nBoth interfaces and abstract classes provide ways to define contracts that classes must follow. Interfaces define what a class can do. Abstract classes define what a class is. An interface has no implementation. An abstract class can have implemented methods. A class can implement multiple interfaces but can inherit from only one abstract class.\n\nUse interfaces for capabilities that unrelated classes might share. Use abstract classes for related classes that share common implementation.",
        task: {
          title: "Interfaces and Abstraction Quiz",
          description: "Test your understanding of interfaces:",
          questions: [
            "What is an interface and what does it represent?",
            "Explain the concept of interface segregation.",
            "Why can a class implement multiple interfaces?",
            "What is the difference between implementing one interface and inheriting from one class?",
            "When would you use explicit interface implementation?",
            "What does it mean for an interface to be a contract?",
            "Explain how interfaces enable loose coupling."
          ],
          expectedAnswers: [
            ["contract", "must implement", "members", "methods"],
            ["specific", "focused", "small", "segregated"],
            ["multiple capabilities", "implement many", "contracts"],
            ["interface multiple", "class one", "capability"],
            ["hide", "access", "conflict", "interface reference"],
            ["promise", "must fulfill", "capabilities"],
            ["depend interface", "not class", "flexible", "swap"]
          ]
        },
        codeExample: "using System;\n\npublic interface IDrawable {\n    void Draw();\n}\n\npublic interface IMovable {\n    void Move(int x, int y);\n}\n\npublic class Circle : IDrawable, IMovable {\n    public int X { get; set; }\n    public int Y { get; set; }\n    public int Radius { get; set; }\n    \n    public void Draw() {\n        Console.WriteLine($\"Drawing circle at ({X}, {Y}) with radius {Radius}\");\n    }\n    \n    public void Move(int x, int y) {\n        X = x;\n        Y = y;\n        Console.WriteLine($\"Moved to ({X}, {Y})\");\n    }\n}\n\nclass Program {\n    static void DisplayShape(IDrawable shape) {\n        shape.Draw();\n    }\n    \n    static void Main() {\n        var circle = new Circle { X = 10, Y = 20, Radius = 5 };\n        \n        DisplayShape(circle);\n        circle.Move(30, 40);\n    }\n}"
      }
    ]
  },

  "collections-generics": {
    title: "Collections and Generics",
    section: "Data Structures",
    color: "#FFD93D",
    lessons: [
      {
        id: "lists-and-collections",
        title: "Understanding Collections",
        duration: "30 min",
        content: "What Are Collections?\n\nCollections are containers that hold multiple items. Arrays are the simplest collection, but C# provides many more sophisticated collection types for different purposes. While arrays have a fixed size, most collections can grow and shrink as you add and remove items.\n\nWhy not just use arrays? Arrays are fast and use memory efficiently, but they have limitations. Their size is fixed at creation time. Adding or removing items in the middle of an array is inefficient. Collections address these limitations by providing flexible, purpose-built containers.\n\nList<T> Collections\n\nThe List class is one of the most commonly used collections. A list is like an array that can grow. You start with zero items and add items one by one. The list automatically expands as needed. You can add, remove, and find items easily.\n\nLists maintain insertion order. The first item added is at index zero, the second at index one, and so on. You can access items by index just like an array. You can iterate through all items in order. Lists are perfect when you need an ordered collection that can change size.\n\nDictionary Collections\n\nWhile lists use numeric indices to access items, dictionaries use keys. You store items as key-value pairs. Instead of asking \"what's at position 5,\" you ask \"what's the item with key 'Alice'?\" This is incredibly useful when you want to look up items by some meaningful identifier rather than by position.\n\nDictionaries are implemented as hash tables internally, which makes lookups very fast. Even with millions of items, looking up by key is nearly instant. However, dictionaries don't maintain any particular order.\n\nDictionaries are perfect for scenarios like storing customer records by customer ID, storing settings by key name, or mapping names to phone numbers. Any time you need fast lookup by a meaningful key, a dictionary is the right choice.\n\nQueue and Stack Collections\n\nQueue collections implement First-In-First-Out behavior. The first item added is the first item removed. Queues are useful for scenarios like job queues where jobs are processed in the order they arrive. You enqueue to add an item and dequeue to remove the first item.\n\nStack collections implement Last-In-First-Out behavior. The last item added is the first item removed. Stacks are useful for undo functionality or for processing items in reverse order. You push to add an item and pop to remove the most recently added item.\n\nHashSet Collections\n\nA HashSet contains unique items with no duplicates. If you try to add an item that already exists, the add fails silently. HashSets are useful when you need to track a collection of unique items or check whether something is in a group. Like dictionaries, HashSets use hashing for fast lookups.\n\nChoosing the Right Collection\n\nDifferent collections have different performance characteristics and are suited to different tasks. List is fast for accessing items by position and iterating through all items. Dictionary is fast for looking up items by key. Queue is fast for adding at the end and removing from the front. Stack is fast for adding and removing at the top. HashSet is fast for checking membership and maintaining uniqueness.\n\nUnderstanding these differences helps you write efficient code. Choosing the wrong collection type can make your program slow. Using a list and searching through it linearly is much slower than using a dictionary when you need to look up by key.\n\nIEnumerable and Iteration\n\nMany C# methods work with collections through the IEnumerable interface. This interface provides a way to iterate through items in a collection without caring about the underlying type. You can write code that works with lists, arrays, dictionaries, and other collections through the IEnumerable interface.\n\nThe foreach loop automatically uses IEnumerable to iterate through collections. When you write foreach (var item in collection), the compiler generates code that uses IEnumerable to get each item in turn.",
        task: {
          title: "Collections Quiz",
          description: "Test your understanding of collections:",
          questions: [
            "What is the main advantage of List over an array?",
            "When would you use a Dictionary instead of a List?",
            "Explain the difference between Queue and Stack.",
            "What is the purpose of a HashSet?",
            "What does IEnumerable allow you to do?",
            "Which collection type should you use for fast key-based lookups?",
            "Explain FIFO and LIFO."
          ],
          expectedAnswers: [
            ["dynamic size", "flexible", "grows"],
            ["fast lookup", "key based", "meaningful identifier"],
            ["fifo", "lifo", "first last"],
            ["unique", "no duplicates", "membership"],
            ["iterate", "loop", "foreach"],
            ["dictionary", "hashtable"],
            ["first in first out", "last in first out"]
          ]
        },
        codeExample: "using System;\nusing System.Collections.Generic;\n\nclass CollectionExamples {\n    static void Main() {\n        // List - ordered, dynamic size\n        var numbers = new List<int> { 1, 2, 3 };\n        numbers.Add(4);\n        foreach (var num in numbers) {\n            Console.WriteLine(num);\n        }\n        \n        // Dictionary - key-value pairs\n        var ages = new Dictionary<string, int>();\n        ages[\"Alice\"] = 30;\n        ages[\"Bob\"] = 25;\n        Console.WriteLine(\"Alice is \" + ages[\"Alice\"]);\n        \n        // Queue - FIFO\n        var queue = new Queue<string>();\n        queue.Enqueue(\"First\");\n        queue.Enqueue(\"Second\");\n        Console.WriteLine(queue.Dequeue());\n        \n        // Stack - LIFO\n        var stack = new Stack<string>();\n        stack.Push(\"Top\");\n        stack.Push(\"Middle\");\n        Console.WriteLine(stack.Pop());\n        \n        // HashSet - unique items\n        var unique = new HashSet<string> { \"apple\", \"banana\", \"apple\" };\n        Console.WriteLine(unique.Count);\n    }\n}"
      }
    ]
  },

  "linq-queries": {
    title: "LINQ and Queries",
    section: "Advanced Data",
    color: "#6BCB77",
    lessons: [
      {
        id: "linq-fundamentals",
        title: "Language Integrated Query Basics",
        duration: "28 min",
        content: "What Is LINQ?\n\nLINQ stands for Language Integrated Query. It's a set of features that lets you write database-like queries directly in C#. Instead of looping through collections manually and building up results, you can use LINQ to express what you want and let the framework handle getting it for you.\n\nLINQ is one of the most powerful features in modern C#. It unifies querying across different data sources. Whether you're querying an in-memory list, a database, or XML data, you use the same LINQ syntax. This consistency makes code more readable and powerful.\n\nQuery Syntax vs Method Syntax\n\nLINQ supports two syntaxes. Query syntax looks like SQL and uses keywords like from, where, select, and orderby. Method syntax uses method calls chained together with dot notation. Both syntaxes are equivalent and compile to the same code. The choice between them is mostly stylistic.\n\nQuery syntax is more readable for complex queries, especially those with many filtering or grouping conditions. Method syntax is more flexible and works in more scenarios. Many developers use query syntax when it's natural and switch to method syntax for complex operations.\n\nBasic LINQ Operations\n\nWhere filters a collection based on a condition. Only items matching the condition are included in the result. Select transforms items, possibly changing their type or structure. GroupBy groups items by a key, creating a collection of groups. OrderBy sorts items in ascending order. OrderByDescending sorts in descending order. First, Last, and Take get specific items or numbers of items.\n\nDeferred Execution\n\nOne of the most important concepts about LINQ is deferred execution. When you write a LINQ query, it doesn't execute immediately. The query is stored as a sequence of operations. The actual query execution happens later when you iterate through the results or call a method that forces evaluation.\n\nThis is powerful because it lets you build up complex queries without performance penalties. You only execute the query when you actually need the results. You can also change your mind and add more operations to the query before executing it.\n\nDeferred execution becomes crucial when working with databases. If execution were immediate, every query would hit the database right away. Instead, LINQ builds the entire query and sends it to the database as a single efficient request.\n\nAggregate Functions\n\nAggregate functions compute a single value from a collection. Count returns the number of items. Sum adds up numeric values. Average computes the mean. Max finds the largest value. Min finds the smallest. Any returns whether any items match a condition. All returns whether all items match a condition.\n\nThese functions are implemented as methods in LINQ. They force query execution because they need to examine all items to produce a result.\n\nProjection and Transformation\n\nSelect is the LINQ operation for projection. It transforms items in a collection into a new form. You might select just the Name property from a collection of Person objects, creating a collection of strings. You might select to a new type entirely, creating projection objects with selected properties.\n\nProjection is powerful because it lets you extract exactly what you need from a collection. If you're working with a large object, but you only need two properties, projection lets you create a smaller, focused result.\n\nJoining Collections\n\nJoin connects two collections based on a matching key. If you have a collection of Employees and a collection of Departments, you can join them to get employees with their department information. The join operation works like a database join, matching items from the two collections based on a key.\n\nGroupJoin is like a left join in SQL. It groups items from the right collection for each item in the left collection, even if there are no matches.\n\nChaining Multiple Operations\n\nOne of the strengths of LINQ is the ability to chain operations. You can filter with Where, then project with Select, then order with OrderBy, all in a single expression. Each operation builds on the previous one. The final result contains exactly what you specified through all the operations.\n\nChaining makes code very expressive. Reading the query tells you exactly what the code is doing. It's often clearer than writing explicit loops.",
        task: {
          title: "LINQ Fundamentals Quiz",
          description: "Test your LINQ knowledge:",
          questions: [
            "What does LINQ stand for and what does it do?",
            "Explain the difference between query syntax and method syntax.",
            "What is deferred execution and why is it important?",
            "Name three aggregate functions and what they do.",
            "What does Select do in LINQ?",
            "Explain the purpose of Where in LINQ.",
            "What does GroupBy do?"
          ],
          expectedAnswers: [
            ["language integrated query", "database queries"],
            ["sql like", "method chaining", "equivalent"],
            ["execute later", "lazy evaluation", "efficient"],
            ["count sum average", "max min", "aggregate"],
            ["transform", "projection", "new form"],
            ["filter", "condition", "match"],
            ["group", "organize", "key"]
          ]
        },
        codeExample: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass LINQExamples {\n    static void Main() {\n        var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };\n        \n        // Query syntax\n        var evenQuery = from n in numbers\n                        where n % 2 == 0\n                        select n;\n        \n        // Method syntax\n        var evenMethod = numbers.Where(n => n % 2 == 0);\n        \n        // Chaining operations\n        var result = numbers\n            .Where(n => n > 3)\n            .OrderBy(n => n)\n            .Select(n => n * 2);\n        \n        // Aggregate functions\n        int count = numbers.Count();\n        int sum = numbers.Sum();\n        double average = numbers.Average();\n        int max = numbers.Max();\n        \n        Console.WriteLine(\"Even numbers: \" + string.Join(\", \", evenMethod));\n        Console.WriteLine(\"Count: \" + count);\n        Console.WriteLine(\"Sum: \" + sum);\n    }\n}"
      }
    ]
  },

  "error-handling": {
    title: "Error Handling and Exceptions",
    section: "Robustness",
    color: "#FF6B9D",
    lessons: [
      {
        id: "exceptions-and-handling",
        title: "Try, Catch, and Exception Handling",
        duration: "26 min",
        content: "Understanding Exceptions\n\nAn exception is an event that occurs during program execution that disrupts the normal flow. When your code encounters a situation it can't handle normally, it raises an exception. An exception is basically an error object that contains information about what went wrong.\n\nExceptions are not failures. They're a normal part of programming. Almost every program encounters exceptions. A well-written program handles exceptions gracefully. It catches them, logs information about them, and either fixes the problem or fails safely.\n\nWithout exception handling, an unhandled exception would crash your entire program. Exception handling lets your program detect problems and decide how to respond. Maybe it can recover. Maybe it should show an error message to the user. Maybe it should clean up and shut down gracefully.\n\nThe Try-Catch Structure\n\nThe try block contains code that might raise an exception. The catch block handles the exception if one occurs. You write the potentially problematic code in try and write code to handle problems in catch.\n\nWhen an exception occurs in the try block, execution immediately jumps to the catch block. The code after the exception in the try block doesn't execute. The catch block can access information about what went wrong and decide how to respond.\n\nYou can have multiple catch blocks for different exception types. Different exception types are caught by different catch blocks. This lets you handle different problems differently. A FileNotFoundException might be handled differently than a DivideByZeroException.\n\nThe Finally Block\n\nThe finally block is optional and contains code that runs whether an exception occurred or not. Code in finally always executes. This is perfect for cleanup code that must run regardless of success or failure. If you open a file in try, you should close it in finally to ensure it gets closed even if an exception occurs.\n\nCommon Exception Types\n\nThe base Exception class is the parent of all exceptions. NullReferenceException occurs when you try to access a member of a null object. ArgumentException occurs when a method receives an invalid argument. InvalidOperationException occurs when an object is in an invalid state for the operation. IOException occurs when there's a problem with file operations. SqlException occurs with database problems.\n\nUnderstanding exception types helps you write appropriate handling code. Each exception type has a specific meaning. If you catch ArgumentException, you know the problem is with arguments passed to a method.\n\nThe Using Statement\n\nThe using statement is a shortcut for try-finally when working with disposable resources. Any object implementing IDisposable can be used with using. The object is automatically disposed in the finally block. This is the standard way to manage resources like files, database connections, and streams.\n\nThrow and Custom Exceptions\n\nYou can throw exceptions manually when your code detects a problem. The throw keyword raises an exception. You can throw built-in exceptions or custom exceptions you create.\n\nCustom exceptions let you represent problems specific to your application. Instead of throwing a generic Exception, you can throw a NegativeAmountException or InvalidProductException that specifically represents the problem. This makes code clearer and makes handling specific problems easier.\n\nException Handling Best Practices\n\nCatch specific exceptions, not the base Exception class. If you catch everything with catch (Exception ex), you might mask unexpected problems. Catch only the exceptions you expect and know how to handle. Let unexpected exceptions propagate up.\n\nLog exception information. When an exception occurs, you should record what happened so you can understand the problem later. Logging should include the exception message and stack trace. Include context information about what the program was trying to do.\n\nDon't use exceptions for expected control flow. Exceptions are expensive and should be used for exceptional situations, not for normal program logic. If you expect an operation might fail, use methods like TryParse that return success or failure, not exceptions.\n\nClean up resources. If your code opens files or connections, ensure they're closed even when exceptions occur. Use finally blocks or using statements for this.\n\nProvide meaningful messages. Exception messages should help someone understand what went wrong and what to do about it. \"Error\" is not helpful. \"Customer ID 12345 not found in database\" is helpful.",
        task: {
          title: "Exception Handling Quiz",
          description: "Test your exception handling knowledge:",
          questions: [
            "What is an exception and why do we handle them?",
            "Explain the structure of try-catch blocks.",
            "What is the purpose of the finally block?",
            "When would you use a using statement?",
            "Explain the difference between throw and catching exceptions.",
            "Why should you catch specific exceptions rather than Exception?",
            "Name three common exception types."
          ],
          expectedAnswers: [
            ["error event", "disrupts flow", "handle gracefully"],
            ["try code", "catch handle", "exception"],
            ["cleanup", "always run", "finally"],
            ["disposable", "resources", "cleanup"],
            ["raise throw", "catch handle"],
            ["specific handling", "mask problems", "expected"],
            ["nullreference", "argument", "invalidoperation", "ioexception"]
          ]
        },
        codeExample: "using System;\nusing System.IO;\n\nclass ExceptionExamples {\n    static void Main() {\n        // Basic try-catch\n        try {\n            int result = Divide(10, 0);\n        } catch (DivideByZeroException ex) {\n            Console.WriteLine(\"Cannot divide by zero\");\n        } catch (ArgumentException ex) {\n            Console.WriteLine(\"Invalid argument: \" + ex.Message);\n        }\n        \n        // Try-catch-finally\n        try {\n            var numbers = new int[5];\n            numbers[10] = 1;\n        } catch (IndexOutOfRangeException) {\n            Console.WriteLine(\"Index out of range\");\n        } finally {\n            Console.WriteLine(\"Cleanup done\");\n        }\n        \n        // Using statement\n        try {\n            using (var file = File.OpenText(\"data.txt\")) {\n                string line = file.ReadLine();\n            }\n        } catch (FileNotFoundException) {\n            Console.WriteLine(\"File not found\");\n        }\n    }\n    \n    static int Divide(int a, int b) {\n        if (b == 0) throw new DivideByZeroException();\n        return a / b;\n    }\n}"
      }
    ]
  },

  "async-await": {
    title: "Asynchronous Programming",
    section: "Advanced",
    color: "#4CAF50",
    lessons: [
      {
        id: "async-fundamentals",
        title: "Async, Await, and Concurrency",
        duration: "30 min",
        content: "Why Asynchronous Programming?\n\nAsynchronous programming is about doing things without blocking. In traditional synchronous code, when you perform an operation like reading a file, your code waits for the operation to complete before continuing. While waiting, the thread is stuck and can't do anything else.\n\nAsynchronous programming lets your code start an operation and continue with other work while that operation completes. This is essential for responsive user interfaces and for efficient server applications that handle many requests.\n\nImagine a restaurant. Synchronous service would mean one waiter takes an order, waits at the kitchen while the meal is prepared, and only then takes the next order. Asynchronous service means the waiter takes an order, passes it to the kitchen, takes other orders, and checks back when meals are ready. Asynchronous is much more efficient.\n\nThreads vs Async\n\nTraditionally, concurrency was achieved with threads. You'd start multiple threads to do multiple things concurrently. Threads work, but they're heavyweight and expensive. Each thread consumes memory and operating system resources. If you need to handle thousands of concurrent operations, threads become impractical.\n\nAsync code is lighter weight. Async operations don't require dedicated threads. A single thread can manage many async operations. This makes async perfect for I/O-bound operations like file reading, network requests, and database queries.\n\nThreads are still useful for CPU-bound work where you actually need parallel computation. Async is perfect for I/O-bound work where you're waiting for something external.\n\nAsync Methods and Task\n\nAn async method is declared with the async keyword. Async methods return a Task or Task<T>. A Task represents an asynchronous operation that can be awaited. Task<T> represents an asynchronous operation that returns a value of type T when complete.\n\nAsync methods can contain await expressions. The await keyword pauses execution of the async method without blocking a thread. The method resumes when the awaited operation completes. Between pause and resume, the thread can do other work.\n\nThis is the magic of async/await. It looks like synchronous code. You write await GetData(), and it seems to wait for GetData to finish. But it doesn't actually block. The thread is free to do other work.\n\nWriting Async Methods\n\nWhen writing an async method, you're creating a method that can be awaited by callers. The method should generally contain at least one await. An async method without awaits is unusual and probably a mistake.\n\nAsync methods should return Task if they don't return a value, or Task<T> if they return a value. Never return void from an async method except for event handlers. Void async methods can't be awaited, making error handling impossible.\n\nException Handling in Async\n\nExceptions in async methods propagate through the Task. When you await a task, if the task threw an exception, that exception is thrown at the await statement. This means normal try-catch blocks work perfectly with async code.\n\nAsync All the Way\n\nAsync is contagious. If you call an async method, you should probably be in an async method. This creates a chain of async methods all the way up. Eventually, something has to be synchronous. This is usually the Main method or an event handler.\n\nBlocking on async code, using Wait() or Result, can cause deadlocks in certain contexts, particularly in UI applications. Best practice is to have async all the way up.\n\nCombining Multiple Async Operations\n\nTask.WhenAll waits for multiple tasks to complete. It's useful when you want to wait for several async operations to all finish before continuing. Task.WhenAny returns when any of multiple tasks completes. This is useful for race conditions where you want the first result.\n\nAsync Patterns in LINQ\n\nLINQ can be used with async. Libraries like Entity Framework Core provide async versions of LINQ methods like ToListAsync() and FirstAsync(). These let you perform database queries asynchronously, which is essential for responsive applications.\n\nComparison with Go\n\nFor Go developers, async/await in C# is similar to goroutines and channels in Go. Both let you write concurrent code. However, they work differently. Go goroutines are actual lightweight threads managed by the runtime. C# async/await uses continuations and state machines to avoid threads. Both are effective, just different philosophies.",
        task: {
          title: "Async Programming Quiz",
          description: "Test your async/await knowledge:",
          questions: [
            "What is asynchronous programming and why is it useful?",
            "Explain the difference between sync and async code execution.",
            "What does the await keyword do?",
            "Explain Task and Task<T> in C#.",
            "Why should async methods return Task, not void?",
            "What does Task.WhenAll do?",
            "How do exceptions work in async methods?"
          ],
          expectedAnswers: [
            ["non blocking", "responsive", "concurrent", "io bound"],
            ["sync blocks", "async continues", "non blocking"],
            ["pause execution", "resume later", "non blocking"],
            ["asynchronous operation", "generic result"],
            ["void not awaitable", "error handling"],
            ["wait all", "multiple tasks", "complete"],
            ["propagate task", "try catch", "throw await"]
          ]
        },
        codeExample: "using System;\nusing System.Threading.Tasks;\nusing System.Net.Http;\n\nclass AsyncExamples {\n    static async Task Main() {\n        Console.WriteLine(\"Starting\");\n        \n        // Awaiting a single async operation\n        string result = await FetchDataAsync();\n        Console.WriteLine(\"Result: \" + result);\n        \n        // Multiple async operations\n        var task1 = FetchDataAsync();\n        var task2 = FetchDataAsync();\n        var results = await Task.WhenAll(task1, task2);\n        \n        Console.WriteLine(\"Done\");\n    }\n    \n    static async Task<string> FetchDataAsync() {\n        await Task.Delay(1000);\n        return \"Data received\";\n    }\n    \n    static async Task ProcessFileAsync(string filename) {\n        try {\n            string content = await ReadFileAsync(filename);\n            Console.WriteLine(content);\n        } catch (Exception ex) {\n            Console.WriteLine(\"Error: \" + ex.Message);\n        }\n    }\n    \n    static async Task<string> ReadFileAsync(string filename) {\n        await Task.Delay(500);\n        return \"File contents\";\n    }\n}"
      }
    ]
  },

  "design-patterns": {
    title: "Design Patterns and Best Practices",
    section: "Professional",
    color: "#FF9800",
    lessons: [
      {
        id: "common-patterns",
        title: "Common Design Patterns",
        duration: "32 min",
        content: "What Are Design Patterns?\n\nDesign patterns are proven solutions to common programming problems. They're not specific to C#; they're general software design principles that have been discovered and refined over decades. Using design patterns makes your code more professional, more maintainable, and easier for other developers to understand.\n\nA design pattern is like a recipe. It describes a general approach to solving a problem. You adapt the recipe to your specific situation. You don't follow it exactly; you follow the principles and apply them to your needs.\n\nThe Factory Pattern\n\nThe Factory pattern creates objects without specifying their exact classes. Instead of writing new Dog() or new Cat(), you call a factory method that decides what type to create. The caller doesn't need to know about Dog and Cat; it just asks the factory for an animal.\n\nFactories are useful when you need to hide implementation details or when object creation is complex. A database factory might handle creating the right database connection type based on configuration. A shape factory might create different shapes based on a parameter.\n\nThe Singleton Pattern\n\nThe Singleton pattern ensures a class has only one instance and provides global access to it. Some things naturally have only one instance in your program, like a logger or a database connection pool. The Singleton pattern enforces this.\n\nA Singleton class has a private constructor to prevent direct instantiation and a static method to get the single instance. The first time you request an instance, it's created. Subsequent requests return the same instance.\n\nSingletons are useful but should be used sparingly. They create global state, which can make code harder to test. Modern C# style often uses dependency injection instead of Singletons.\n\nThe Observer Pattern\n\nThe Observer pattern lets objects notify other objects about state changes. One object is the subject. Other objects are observers. When the subject's state changes, it notifies all observers.\n\nC# has built-in support for the Observer pattern through events and delegates. An event is a way for a class to notify other classes about something interesting happening. Other classes subscribe to the event to be notified.\n\nThe Strategy Pattern\n\nThe Strategy pattern defines a family of algorithms and lets you swap between them. You create different strategy classes for different algorithms. A context class uses a strategy to perform work. At runtime, you can change which strategy is being used.\n\nFor example, a payment processor might have different strategies for payment processing: CreditCardStrategy, PayPalStrategy, BitcoinStrategy. Depending on what the user chooses, the payment processor uses the appropriate strategy.\n\nThe Decorator Pattern\n\nThe Decorator pattern adds behavior to objects dynamically without modifying their structure. Instead of subclassing to add functionality, you wrap an object in a decorator that adds functionality.\n\nFor example, you might have a simple file reader class. You can decorate it with a caching decorator that caches reads, or an encryption decorator that decrypts data. Multiple decorators can be composed to add different functionality.\n\nThe Template Method Pattern\n\nThe Template Method pattern defines the skeleton of an algorithm in a base class but lets subclasses override specific steps. The base class implements the overall flow, and subclasses fill in the details.\n\nFor example, a document processing class might define the overall flow: read document, parse document, validate document, save document. Specific document types override the parse and validate methods to handle their specific format.\n\nThe Dependency Injection Pattern\n\nDependency Injection is about giving objects what they need rather than having them create it themselves. Instead of a class creating its dependencies, you pass them in through the constructor or as properties.\n\nThis makes code more testable because you can inject test versions of dependencies. It also makes code more flexible because you can swap implementations without changing the class.\n\nModern C# frameworks like ASP.NET Core have built-in dependency injection support. The framework automatically creates objects and injects their dependencies based on configuration.\n\nThe SOLID Principles\n\nSOLID is an acronym for five principles of good object-oriented design. Single Responsibility Principle means a class should have one reason to change. Open/Closed Principle means classes should be open for extension but closed for modification. Liskov Substitution Principle means subclasses should be substitutable for base classes. Interface Segregation Principle means clients should depend on focused interfaces, not broad ones. Dependency Inversion Principle means depend on abstractions, not concrete implementations.\n\nFollowing SOLID principles results in code that's easier to maintain, test, and extend.",
        task: {
          title: "Design Patterns Quiz",
          description: "Test your design patterns knowledge:",
          questions: [
            "Explain the Factory pattern and its benefits.",
            "What is the Singleton pattern used for?",
            "How does the Observer pattern work?",
            "Explain the Strategy pattern.",
            "What problem does Dependency Injection solve?",
            "Explain the Single Responsibility Principle.",
            "Name three SOLID principles."
          ],
          expectedAnswers: [
            ["create objects", "hide implementation", "complex"],
            ["single instance", "global access", "one instance"],
            ["notify", "observers", "subscribe"],
            ["algorithms", "swap", "strategies"],
            ["testable", "flexible", "inject"],
            ["one reason", "change", "focused"],
            ["srp", "ocp", "lsp", "isp", "dip"]
          ]
        },
        codeExample: "using System;\nusing System.Collections.Generic;\n\n// Factory Pattern\npublic abstract class Animal { }\npublic class Dog : Animal { }\npublic class Cat : Animal { }\n\npublic class AnimalFactory {\n    public static Animal CreateAnimal(string type) {\n        return type.ToLower() switch {\n            \"dog\" => new Dog(),\n            \"cat\" => new Cat(),\n            _ => throw new ArgumentException(\"Unknown type\")\n        };\n    }\n}\n\n// Singleton Pattern\npublic class Logger {\n    private static Logger _instance;\n    \n    private Logger() { }\n    \n    public static Logger Instance {\n        get {\n            _instance = _instance ?? new Logger();\n            return _instance;\n        }\n    }\n    \n    public void Log(string message) {\n        Console.WriteLine(\"[LOG] \" + message);\n    }\n}\n\n// Observer Pattern with Events\npublic class Subject {\n    public event EventHandler<string> OnStateChanged;\n    \n    public void ChangeState(string newState) {\n        OnStateChanged?.Invoke(this, newState);\n    }\n}\n\nclass Program {\n    static void Main() {\n        // Factory\n        var animal = AnimalFactory.CreateAnimal(\"dog\");\n        \n        // Singleton\n        Logger.Instance.Log(\"Application started\");\n        \n        // Observer\n        var subject = new Subject();\n        subject.OnStateChanged += (sender, state) => {\n            Console.WriteLine(\"State changed to: \" + state);\n        };\n        subject.ChangeState(\"Active\");\n    }\n}"
      }
    ]
  },

  "working-with-data": {
    title: "Working with Data",
    section: "Practical",
    color: "#FF5722",
    lessons: [
      {
        id: "json-xml-serialization",
        title: "Serialization and Data Formats",
        duration: "28 min",
        content: "Why Serialization Matters\n\nSerialization is the process of converting objects into a format that can be stored or transmitted. When you save data to a file, send it over a network, or store it in a database, you're serializing it. Deserialization is the reverse process of reconstructing objects from serialized data.\n\nC# provides tools for serializing to different formats. JSON is lightweight and human-readable. XML is structured and good for complex hierarchies. C# has excellent support for both.\n\nJSON Serialization\n\nJSON stands for JavaScript Object Notation. It's a lightweight format that's become the standard for web APIs and data interchange. JSON represents objects as collections of key-value pairs and arrays.\n\nC# includes the System.Text.Json namespace for JSON serialization. You can serialize an object to JSON with JsonSerializer.Serialize(object). Deserialization works the other way with JsonSerializer.Deserialize.\n\nJSON is human-readable and compact. A JSON representation is smaller than XML for the same data. Most modern web APIs use JSON, making it essential knowledge.\n\nXML Serialization\n\nXML stands for Extensible Markup Language. It's more structured than JSON and was popular before JSON became dominant. XML is still used in many enterprise systems.\n\nXML represents data as nested elements with attributes. It's very structured and can represent complex hierarchies clearly. C# has built-in support for XML serialization with attributes like [XmlElement] and [XmlAttribute].\n\nDataAnnotations for Serialization\n\nC# allows you to control serialization with attributes. The [JsonPropertyName] attribute changes the name of a property in JSON. The [JsonIgnore] attribute prevents a property from being serialized. These attributes let you customize how your objects are serialized without changing your code logic.\n\nHandling Dates and Special Values\n\nSerialization gets tricky with certain types like dates, Guids, and nullable values. JSON has a standard format for dates, but different APIs sometimes use different formats. Custom serialization handlers let you control how these types are serialized.\n\nDatabases and ORM\n\nWhen working with databases, you typically use an ORM like Entity Framework Core. ORMs handle serialization to and from the database automatically. They map C# objects to database tables. You don't write SQL; the ORM generates it.\n\nEntity Framework Core handles loading data from the database and serializing it to C# objects. It also handles the reverse, taking your C# objects and writing them to the database. This frees you from writing raw SQL in most cases.\n\nValidation\n\nBefore serializing data, you often want to validate it. C# has validation attributes like [Required], [StringLength], [Range], and [RegularExpression]. You can apply these attributes to properties and then validate objects before serializing them.\n\nValidation ensures data is in a valid state before it's stored or transmitted. This prevents corrupted data from entering your system.\n\nError Handling in Serialization\n\nSerialization can fail if the format is invalid or the data doesn't match the expected type. You should wrap serialization in try-catch blocks to handle JsonException or XmlException. Providing good error messages helps track down formatting issues.",
        task: {
          title: "Data Serialization Quiz",
          description: "Test your serialization knowledge:",
          questions: [
            "What is serialization and why is it important?",
            "What is JSON and when is it used?",
            "Explain the difference between JSON and XML.",
            "How do you serialize an object to JSON in C#?",
            "What are DataAnnotations and how do they help?",
            "What is an ORM and why would you use one?",
            "How do you handle validation before serialization?"
          ],
          expectedAnswers: [
            ["convert object", "store transmit", "format"],
            ["javascript notation", "lightweight", "key value"],
            ["json compact", "xml structured", "json simple"],
            ["jsonserializer", "serialize"],
            ["control", "customize", "attributes"],
            ["object relational", "maps objects", "database"],
            ["validate", "attributes", "before"]
          ]
        },
        codeExample: "using System;\nusing System.Text.Json;\nusing System.Text.Json.Serialization;\nusing System.Collections.Generic;\n\npublic class Person {\n    [JsonPropertyName(\"name\")]\n    public string Name { get; set; }\n    \n    [JsonPropertyName(\"age\")]\n    public int Age { get; set; }\n    \n    [JsonIgnore]\n    public string InternalId { get; set; }\n}\n\nclass SerializationExamples {\n    static void Main() {\n        var person = new Person {\n            Name = \"Alice\",\n            Age = 30,\n            InternalId = \"12345\"\n        };\n        \n        // Serialize to JSON\n        string json = JsonSerializer.Serialize(person);\n        Console.WriteLine(\"JSON: \" + json);\n        \n        // Deserialize from JSON\n        var deserializedPerson = JsonSerializer.Deserialize<Person>(json);\n        Console.WriteLine(\"Deserialized: \" + deserializedPerson.Name);\n        \n        // List of objects\n        var people = new List<Person> {\n            new Person { Name = \"Bob\", Age = 25 },\n            new Person { Name = \"Carol\", Age = 28 }\n        };\n        \n        string jsonArray = JsonSerializer.Serialize(people);\n        Console.WriteLine(\"Array: \" + jsonArray);\n    }\n}"
      }
    ]
  }
};

function CodeEditor({ tk, lesson }) {
  const [code, setCode] = useState(lesson.codeExample);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      let result = "Program Output:\n";
      result += "─".repeat(50) + "\n";
      result += "✓ Code executed successfully\n";
      result += "─".repeat(50) + "\n\n";
      result += "Note: To run full C# code, copy this to your local environment with .NET SDK\n";
      setOutput(result);
      setIsRunning(false);
    }, 500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: tk.raised, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottom: "1px solid " + tk.border }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: tk.dim }}>Program.cs</span>
            <button onClick={copyCode} style={{ background: "none", border: "none", color: tk.dim, cursor: "pointer" }}>
              {copied ? <Check size={14} color={tk.success} /> : <Copy size={14} />}
            </button>
          </div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{ flex: 1, padding: "12px", fontFamily: "monospace", fontSize: 12, color: tk.text, background: tk.surface, border: "1px solid " + tk.border, outline: "none", minHeight: 300, resize: "none" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 12px", background: tk.raised, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottom: "1px solid " + tk.border, fontSize: 12, fontWeight: 600, color: tk.dim }}>Terminal Output</div>
          <div style={{ flex: 1, padding: "12px", fontFamily: "monospace", fontSize: 11, color: tk.success, background: "#0a0a0a", border: "1px solid " + tk.border, whiteSpace: "pre-wrap", overflowY: "auto", minHeight: 300 }}>
            {output || "Run code to see output..."}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={runCode} disabled={isRunning} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: tk.go, color: "#000", border: "none", borderRadius: 6, fontWeight: 600, cursor: isRunning ? "not-allowed" : "pointer", fontSize: 13 }}>
          <Play size={14} /> {isRunning ? "Running..." : "Run"}
        </button>
        <button onClick={() => setOutput("")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: tk.raised, color: tk.text, border: "1px solid " + tk.border, borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
          <RefreshCw size={14} /> Clear
        </button>
      </div>
    </div>
  );
}

function TaskPanel({ tk, task }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: tk.raised, border: "1px solid " + tk.border, padding: "20px", borderRadius: 10, marginBottom: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 12px" }}>{"📝 " + task.title}</h3>
      <p style={{ fontSize: 14, color: tk.dim, marginBottom: 16 }}>{task.description}</p>

      <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
        {task.questions.map((q, i) => (
          <div key={i} style={{ padding: "12px", background: tk.surface, border: "1px solid " + tk.border, borderRadius: 6 }}>
            <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 8px" }}>{(i + 1) + ". " + q}</p>
            <input type="text" placeholder="Your answer..." style={{ width: "100%", padding: "8px", border: "1px solid " + tk.border, background: tk.raised, color: tk.text, borderRadius: 4, fontSize: 12, outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>

      {submitted && (
        <div style={{ padding: "12px", background: tk.success + "20", border: "1px solid " + tk.success, color: tk.success, borderRadius: 6, fontSize: 13, marginBottom: 16 }}>
          ✓ Submitted! Keep learning!
        </div>
      )}

      <button onClick={() => setSubmitted(true)} style={{ padding: "8px 16px", background: tk.cs, color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
        Submit Answers
      </button>
    </div>
  );
}

function SignInPage({ tk, onSignIn }) {
  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("Demo123");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSignIn = () => {
    setError("");
    const emailTrim = email.trim().toLowerCase();
    const pwdTrim = password.trim();

    if (!emailTrim) return setError("Enter email");
    if (!pwdTrim) return setError("Enter password");

    try {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      const user = users[emailTrim];

      if (!user) {
        localStorage.setItem("users", JSON.stringify({ ...users, [emailTrim]: { name: "Learner", password: pwdTrim, progress: {} } }));
      } else if (user.password !== pwdTrim) {
        return setError("Wrong password");
      }

      onSignIn({ name: user?.name || "Learner", email: emailTrim });
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: tk.bg, padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 8px", color: tk.text }}>gopher<span style={{ color: tk.cs }}>#{" "}</span></h1>
          <p style={{ color: tk.dim, fontSize: 14, margin: 0 }}>Master C# and .NET Development for Go Developers</p>
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "2px solid " + tk.border }}>
          <button type="button" onClick={() => { setTab("signin"); setError(""); }} style={{ flex: 1, padding: "12px", background: "none", border: "none", color: tab === "signin" ? tk.cs : tk.dim, borderBottom: tab === "signin" ? "3px solid " + tk.cs : "none", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Sign In</button>
          <button type="button" onClick={() => { setTab("signup"); setError(""); }} style={{ flex: 1, padding: "12px", background: "none", border: "none", color: tab === "signup" ? tk.cs : tk.dim, borderBottom: tab === "signup" ? "3px solid " + tk.cs : "none", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Create</button>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {tab === "signup" && <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "11px 12px", border: "1px solid " + tk.border, background: tk.raised, color: tk.text, borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />}

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "11px 12px", border: "1px solid " + tk.border, background: tk.raised, color: tk.text, borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />

          <div style={{ position: "relative" }}>
            <input type={showPwd ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "11px 12px", paddingRight: 36, border: "1px solid " + tk.border, background: tk.raised, color: tk.text, borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: tk.dim, cursor: "pointer" }}>
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <div style={{ padding: "11px 12px", background: tk.danger + "18", border: "1px solid " + tk.danger, color: tk.danger, borderRadius: 8, fontSize: 13, display: "flex", gap: 8 }}><AlertCircle size={14} /> {error}</div>}

          <button type="button" onClick={handleSignIn} style={{ padding: "11px", background: tk.go, color: "#000", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            {tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p style={{ fontSize: 12, color: tk.dim, textAlign: "center", marginTop: 20 }}>Demo: <strong>demo@demo.com</strong> | <strong>Demo123</strong></p>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const tk = theme === "dark" ? DARK : LIGHT;
  const [user, setUser] = useState(null);
  const [view, setView] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
    try {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      setProgress(users[userData.email]?.progress || {});
    } catch {
      setProgress({});
    }
  };

  const completeLesson = (courseId, lessonId) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[user.email]) {
        const key = courseId + "-" + lessonId;
        users[user.email].progress[key] = { completed: true };
        localStorage.setItem("users", JSON.stringify(users));
      }
    } catch (err) {
      console.error("Save error:", err);
    }
    const key = courseId + "-" + lessonId;
    setProgress(prev => ({ ...prev, [key]: { completed: true } }));
  };

  if (!user) return <SignInPage tk={tk} onSignIn={handleSignIn} />;

  const courseList = Object.entries(COURSES);
  const completedCount = Object.keys(progress).length;
  const totalLessons = courseList.reduce((sum, item) => sum + item[1].lessons.length, 0);
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div style={{ background: tk.bg, color: tk.text, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ height: 60, borderBottom: "1px solid " + tk.border, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: tk.surface }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0, cursor: "pointer" }} onClick={() => { setView("courses"); setSelectedCourse(null); }}>
          gopher<span style={{ color: tk.cs }}>#{" "}</span>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: tk.dim }}>{"👤 " + (user?.name || "User")}</span>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ background: "none", border: "none", color: tk.dim, cursor: "pointer" }}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => { setUser(null); setProgress({}); setView("courses"); }} style={{ background: "none", border: "none", color: tk.danger, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Sign out</button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <aside style={{ width: 280, borderRight: "1px solid " + tk.border, overflowY: "auto", padding: "20px", background: tk.surface }}>
          <button onClick={() => { setView("courses"); setSelectedCourse(null); }} style={{ width: "100%", textAlign: "left", padding: "10px", background: view === "courses" ? tk.raised : "transparent", border: "none", color: tk.text, borderRadius: 6, cursor: "pointer", marginBottom: 20, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
            <Home size={16} /> Dashboard
          </button>

          <p style={{ fontSize: 11, fontWeight: 700, color: tk.faint, textTransform: "uppercase", margin: "0 0 12px" }}>Courses</p>
          {courseList.map((item) => {
            const cId = item[0];
            const course = item[1];
            return (
              <div key={cId}>
                <button onClick={() => { setSelectedCourse(cId); setView("course"); }} style={{ width: "100%", textAlign: "left", padding: "8px 10px", background: selectedCourse === cId ? tk.raised : "transparent", border: "none", color: selectedCourse === cId ? tk.cs : tk.text, borderRadius: 6, cursor: "pointer", fontSize: 13, marginBottom: 4, fontWeight: selectedCourse === cId ? 600 : 400 }}>
                  {course.title}
                </button>
                {selectedCourse === cId && course.lessons.map((lesson) => (
                  <button key={lesson.id} onClick={() => { setSelectedLesson(lesson.id); setView("lesson"); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "6px 8px", background: selectedLesson === lesson.id ? tk.cs : "transparent", border: "none", color: selectedLesson === lesson.id ? "#000" : tk.dim, borderRadius: 4, cursor: "pointer", fontSize: 12, marginBottom: 2, fontWeight: selectedLesson === lesson.id ? 600 : 400 }}>
                    {lesson.title}
                  </button>
                ))}
              </div>
            );
          })}
        </aside>

        <main style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
          {view === "courses" && (
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>Welcome, {user?.name?.split(" ")[0]}! 👋</h1>
              <p style={{ color: tk.dim, margin: "0 0 32px" }}>Master C# and .NET with comprehensive courses designed for Go developers</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
                <div style={{ background: tk.raised, border: "1px solid " + tk.border, padding: "20px", borderRadius: 10 }}>
                  <p style={{ fontSize: 12, color: tk.dim, margin: "0 0 8px" }}>📊 Progress</p>
                  <p style={{ fontSize: 32, fontWeight: 700, margin: 0, color: tk.go }}>{pct}%</p>
                </div>
                <div style={{ background: tk.raised, border: "1px solid " + tk.border, padding: "20px", borderRadius: 10 }}>
                  <p style={{ fontSize: 12, color: tk.dim, margin: "0 0 8px" }}>✓ Completed</p>
                  <p style={{ fontSize: 32, fontWeight: 700, margin: 0, color: tk.success }}>{completedCount}/{totalLessons}</p>
                </div>
                <div style={{ background: tk.raised, border: "1px solid " + tk.border, padding: "20px", borderRadius: 10 }}>
                  <p style={{ fontSize: 12, color: tk.dim, margin: "0 0 8px" }}>📚 Courses</p>
                  <p style={{ fontSize: 32, fontWeight: 700, margin: 0, color: tk.cs }}>{courseList.length}</p>
                </div>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 16px" }}>All Courses</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {courseList.map((item) => {
                  const cId = item[0];
                  const course = item[1];
                  return (
                    <div key={cId} onClick={() => { setSelectedCourse(cId); setView("course"); }} style={{ background: tk.raised, border: "1px solid " + tk.border, padding: "20px", borderRadius: 12, cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ width: 40, height: 40, background: course.color + "20", borderRadius: 8, marginBottom: 12 }} />
                      <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>{course.title}</h3>
                      <p style={{ fontSize: 12, color: tk.dim, margin: 0 }}>{course.lessons.length} lessons • {course.section}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "course" && selectedCourse && (
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <button onClick={() => setSelectedCourse(null)} style={{ background: "none", border: "none", color: tk.cs, cursor: "pointer", fontSize: 13, marginBottom: 20, fontWeight: 600 }}>
                ← Back to Courses
              </button>
              <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 20px" }}>{COURSES[selectedCourse].title}</h1>
              <div style={{ display: "grid", gap: 10 }}>
                {COURSES[selectedCourse].lessons.map((lesson) => (
                  <div key={lesson.id} onClick={() => { setSelectedLesson(lesson.id); setView("lesson"); }} style={{ background: tk.raised, border: "1px solid " + tk.border, padding: "16px", borderRadius: 10, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>{lesson.title}</h3>
                      <p style={{ fontSize: 12, color: tk.dim, margin: 0 }}>{"⏱ " + lesson.duration}</p>
                    </div>
                    {progress[selectedCourse + "-" + lesson.id]?.completed && <CheckCircle2 size={20} color={tk.go} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "lesson" && selectedCourse && selectedLesson && (() => {
            const lesson = COURSES[selectedCourse].lessons.find(l => l.id === selectedLesson);
            return lesson ? (
              <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <button onClick={() => setSelectedLesson(null)} style={{ background: "none", border: "none", color: tk.cs, cursor: "pointer", fontSize: 13, marginBottom: 20, fontWeight: 600 }}>
                  ← Back to Course
                </button>

                <div style={{ marginBottom: 24 }}>
                  <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 8px" }}>{lesson.title}</h1>
                  <p style={{ fontSize: 12, color: tk.dim, margin: 0 }}>{"⏱ " + lesson.duration}</p>
                </div>

                <div style={{ background: tk.raised, border: "1px solid " + tk.border, padding: "24px", borderRadius: 10, marginBottom: 32, lineHeight: 1.8, fontSize: 15, color: tk.text, whiteSpace: "pre-wrap", maxHeight: 600, overflowY: "auto", fontFamily: "Inter" }}>
                  {lesson.content}
                </div>

                <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 16px" }}>Code Example</h2>
                <CodeEditor tk={tk} lesson={lesson} />

                <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 16px" }}>Test Your Knowledge</h2>
                <TaskPanel tk={tk} task={lesson.task} />

                {!progress[selectedCourse + "-" + lesson.id]?.completed && (
                  <button onClick={() => completeLesson(selectedCourse, selectedLesson)} style={{ padding: "10px 24px", background: tk.go, color: "#000", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                    ✓ Mark Complete
                  </button>
                )}
              </div>
            ) : null;
          })()}
        </main>
      </div>
    </div>
  );
}