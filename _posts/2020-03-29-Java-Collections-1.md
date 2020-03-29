---
layout: post
author: PoppyFanboy
---

*core java — part `I`, chapters 9.4–9.6* 

## Views and Wrappers

**View** — это коллекция, которая достаётся из какого-то collections framework объекта, и позволяет манипулировать исходной коллекцией через свои методы. (Например, если достать множество ключей из `Map` через метод `keySet()`, то удаление ключей из key set повлечёт удаление ключей из отображения. Кстати, добавлять так новые ключи нельзя, эта `keySet()` коллекция просто выбросит `UnsupportedOperationException`.)

**Легковесные оболочки для коллекций.** Приводит в пример:

- `Arrays.asList(Object...)`, который возвращает unmodifiable список из переданных элементов (скорее всего, внутри там просто массив).
- `Collections.nCopies(int, Object)`, который возвращает unmodifiable коллекцию из $N$ одинаковых элементов, но при этом не хранит миллиард копий одного и того же элемента. Видимо, может быть полезным, чтобы поставить какой-нибудь placeholder список в качестве стандартного значения.
- `Collections.singleton(Object)` и `Collections.emptySet()`, ну ето всё понятно, просто та кие прикольные мини-штуки.

**Unmodifiable views.** Понянтно, что из коллекций можно доставать всякие view'ы вроде там какого-то subrange из списка или подмножества, и их мутация будет как-то влиять на оригинальную коллекцию. Но иногда так бывает, что вот все эти прикольные свойства view'ов не нужны и мы просто хотим достать, например, подмножество. В таком случае нужно:

- Либо создать новую коллекцию через соответсвующий конструктор, который делает новую коллекцию на основе существующей, если мы хотим потом ещё изменять эту коллекцию.
- Либо обернуть эту коллекцию в оболочку, которая ценой небольшого оверхеда кидается исключениями на попытки её изменить. Делается с помощью одого из методов вроде `Collections.unmodifiableList()`, `Collections.unmodifiableSet`, ну и других аналогичных. *Но при этом нужно помнить о том, что оригинальная коллекция всё ещё остаётся мутабельной, так что изменения в ней повлекут изменения и в вот этой "unmodifiable" коллекции.* Если это важно, то, опять же, надо создавать новую коллекцию с нуля.

**Замечание про equals для `unmodifiableCollection(Collection)`.** Так как на этом уровне абстракции нельзя корректно определить равенство двух коллекций, то `UnmodifiableCollection`'ы сравниваются просто по ссылке. Аналогично `hashCode()` вернёт не хеш коллекции внутри обёртки, а просто хеш, основанный на ссылке.

**Synchronized views.** Можно получить синхронизированную коллекцию из любой коллекции с помощью методов ` Collections.synchronizedSomething(Something)`. Тогда, если два треда одновременно пытаются получить доступ к коллекции, то каждый вызов метода будет завершён прежде, чем кто-либо воспользуется коллекцией.

**Checked views.** Это довольно странная штука: это обёртка для коллекции, которая убеждается в том, что добавляемые в неё элементы имеют правильный тип. Достаётся через `Collections.checkedSomething`. При этом, очевидно, из-за type erasure это не будет работать с коллекциями из генерик типов, потому что в рантайме `Pair<String>` не отличим от `Pair<Integer>`, так что от такого тут защиты нет. Плюс в том, что ошибка выявляется прямо в проблемном месте, а не, когда ты пытаешься достать элемент из коллекции. Видимо, это может быть полезно, когда работаешь с легаси кодом, но с учётом выше указанной проблем с генерик типами, выглядит как-то так себе.

**Выбрасывать `UnsupportedOperationException` в реализациях своих коллекций — это тупо.** В случае с collections framework'ом — это вынужденная необходимость, иначе пришлось бы создавать кучу дополнительных интерфейсов (коллекция, которую нельзя изменять, коллекция, в которую нельзя добавлять, но можно удалять (key set для отображений, например), коллекция, которую можно изменять), и это бы всё слишком сильно усложнило. Однако в общем случае, если класс реализует интерфейс, то по сути это означает, что он обязуется так или иначе реализовать всем указанные методы. Если с этим возникают проблемы, то стоит задуматься о том, должен ли данный класс реализовывать данный интерфейс или вообще нужны ли некоторые методы.



## Algorithms

**Реализация алгоритмов для коллекций.** Когда дело доходит для реализации каких-то алгоритмов на коллекциях, то лучше всего реализовывать их для максимально абстрактных коллекций, насколько это возможно, чтобы не надо было лишний раз переписывать код заново для разных более конкретных коллекций. И при реализации нужно думать о наиболее абстрактных инструментах взаимодействия с коллекциями. То есть, например, если требуется найти максимальный элемент в коллекции, то следует реализовать его для `Collection<? extends Comparable>` через итераторы, потому что все коллекции являются `Iterable` (а не через какие-нибудь random access, например, или ещё что-то такое).

**`Comparator.reverseOrder()`.** Кстати, я как-то не знал о таком, это просто компаратор для двух `Comparable` объектов, который пользуется их сравнимостью и просто возвращает `c2.compareTo(c1)` вместо `c1.compareTo(c2)`.

**Простые алгоритмы, реализованные в классе `Collections`.** Не знал о некоторых из тех, что там есть:

- `fill(List<T>, T)`, `addAll(Collection<T>, T...)`, `replaceAll(List<T>, T old, T new)` — добавление/изменение элементов. (Только из списка можно достать `ListIterator`, который умеет изменять значения списка, по которому итерирует, так что для всего, что требует изменение элементов, в качестве аргумента можно передать только список.)
- `indexOfSubList(List<?>, List<?>)` — находит первое вхождение для подсписка и возвращает его позицию.
- `reverse`, `rotate` (так называется циклический сдвиг списка), `frequency` (как часто какой-то элемент встречается в коллекции), `disjoint(Collection, Collection)` (есть ли общие элементы для обоих коллекций).
- `removeIf(Predicate<E> filter)`, `replaceAll(UnaryOperator<E>)`.

**Use interfaces rather than concrete implementation when designing algorithms on collections.** В случае передаваемых значений, чтобы сделать более общий алгоритм, который бы работал на любых конкретных реализациях каких-то интерфейсов, в случае с возвращаемыми значениями — чтобы, если ты потом передумаешь и захочешь возвращать какую-то другую конкретную коллекцию, то не пришлось бы менять свой API.

Тут, кстати, опять всплывает та дурацкая штука с тем, что, например, `RandomAccess` — это маркерный интерфейс, так что в реализации какого-нибудь shuffle придётся сделать дополнительную проверку на это, и, возможно, использовать другую реализацию или скопировать список в массив. Короче, нужно помнить о таких мелочах. Возможно, некоторые из них не удастся предотвратить, и придётся явно указать в API, что, например метод `sort` не может работать с unmodifiable коллекциями.

**Возвращение коллекций, которые являются instance field'ами.** С тем, чтобы возвращать коллекции из каких-то классов, кстати, есть проблема в том, что если надо уберечь возвращённую коллекцию от мутаций, то придётся возвращать либо unmodifiable wrapper для коллекции, либо её копию. Но тут нужно помнить о том, что если возвращаешь unmodifiable wrapper, то он зависит от оригинальной коллекции, и изменяется вместе с её изменениями. А ещё можно возвращать `Iterable` по коллекции вместо самой коллекции, и это, наверное, лучший способ, в том числе в плане производительности.

**Передача коллекций в качестве аргумента в методе.** Тут проблема с изменениями коллекций стоит не так резко, потому что тебе, как разработчику, просто достаточно не изменять переданную коллекцию, если этого не требует метод по своему смыслу и если это не указано в API. Однако в некоторых случаях всё равно удобнее принимать на вход не коллекцию, а итератор или `Function<Key, Value>`. Так точно метод не сможет изменить коллекцию, а ещё в некоторых случаях не придётся создавать временные коллекции. Например, если есть коллекция из каких-то элементов, а метод на вход принимает коллекцию не самих элементов, а их полей, то лучше будет передать итератор, ну или вот етот Function<Key, Value>, если у исходной коллекции есть случайный доступ. Это будет лучше в том числе и в плане производительности ([original post](https://2ch.hk/dr/res/338660.html#355302), [benchmark](https://ideone.com/8iKwBz)).



## Legacy Collections

До того, как появилось Collections API со всеми етими генерик коллекциями, в джавве уже были кое-какие реализации всех основных коллекций, которые потом были интегрированы внутрь Collections API.

![image-20200329205238590](/assets/images/corejava.assets/image-20200329205238590.png)



Здесь:

- `Vector` — synchronized аналог `ArrayList`.
- `Stack` — synchronized аналог `ArrayDeque`.
- `Hashtable` — synchronized аналог `HashMap`, который одновременно реализует `Map<K, V>` из нового API и наследуется от абстрактного класса `Dictionary<K, V>` из старого API.
- `Enumeration` — аналог `Iterator`. Чтобы получить enumeration из коллекций из нового API, чтобы взаимодействовать с легаси кодом, есть метод `Collections.enumeration(Collection)`.
- `Properties` — это очень специфический вариант хеш-таблицы, которая отображает строки в строки. И ещё там можно передать в конструктор `Properties` объект, который выступает как набор дефолтных свойств, которые могут быть потом переопределены. Тут также есть методы для загрузки и сохранения свойств в стримы, видимо, вот только этим они полезны.
- `BitSet` — скорее не *множество*, а *последовательность* битов. Тут есть всякие битовые операции, только базовые операции вроде того, чтобы выставить какой-то по счёту бит, сбросить или достать $i$-ый бит, а ещё можно делать логические операции над двумя `BitSet`'ами. Эта штука получается более эффективной, нежели `boolean[]` массив. (Например, с помощью этой штуки можно реализовать решето Эратосфена.)
