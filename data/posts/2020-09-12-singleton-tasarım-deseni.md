---
title: Singleton Tasarım Deseni
slug: singleton-tasarim-deseni
description: 'Singleton tasarım deseni nedir? Nasıl kullanılır?'
date: 2020-09-12T12:00:00Z
preview: ''
---

Singleton tasarım deseni en basit tasarım desenlerinden bir tanesidir. Singleton tasarım deseni bir Classtan sadece 1 tane nesne oluşturulabilmesini sağlamaktadır.

Singleton bir Classtan direk bir instance oluşturulamaz Classtaki static bir method çağrılır ve bu method eğer Classın bir instance ı oluşturulmadıysa yeni bir instance oluşturarak bunu geri döndürür ve bundan sonra kullanıcı bu methodu her çağırdığında ilk başta oluşturulan instance geri döndürülür.

**SingletonClass.java**

```java
public class SingletonClass {
    private static SingletonClass instance;
    public int number = 0;

    // Dışarıdan yeni bir instance oluşturulamaması için Constructorı private yaptık
    private SingletonClass() {}

    public static SingletonClass getInstance() {
        if (instance == null) {
            instance = new SingletonClass();
        }

        return instance;
    }
}
```

**App.java**

```java
public class App {
    public static void main(String[] args) {
        SingletonClass instance1 = SingletonClass.getInstance();
        SingletonClass instance2 = SingletonClass.getInstance();

        System.out.println(instance1.number);
        instance2.number = 10;
        System.out.println(instance1.number);
    }
}
```

**Output**

```
0
10
```

Çıktıdada görüldüğü gibi instance1 ve instance2 adında 2 tane nesne oluştursakta bunlar aslında aynı instance a sahipler.

Umarım faydalı olmuştur. Okuduğunuz için teşekkürler.
