---
layout: post
author: PoppyFanboy
---

## Synchronization (continued)

----

*продолжение 14.5 в первой книжке core java*

*synchronized keyword*

----

<br>

### The `synchronized` Keyword

**Intrinsic locks.** Lock objects и condition objects — это относительно мощные инструменты и в большинстве случаев нам не нужен такой уровень контроля. Вместо этого можно использовать встроенный в язык инструмент. Каждый объект имеет в себе **intrinsic lock**. (***Instrinsic function*** (или же *built-in function*) — это функция, реализация которой автоматически генерируется компилятором, это не совсем то же самое, что и *inline function*, потому что тут компилятор всё знает о функции, реализацию которой подставляет в method call.) Если пометить метод ключевым словом **`synchronized`**, то этот intrinsic lock защитит сразу весь метод. То есть вот это:

```java
public synchronized void method() {
    // method body
}
```

Эквивалентно вот этому:

```java
public void method() {
    this.intrinsicLock.lock();
    try {
        // method body
    } finally {
        this.intrinsicLock.unlock();
    }
}
```

