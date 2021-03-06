---
layout: post-page
categories: [Learn, Linear Algebra - Основные определения]
---

## Арифметика целых чисел

----

*1.9 в первом томе кострикина*

*делитель, кратность, отношение делимости, простые числа, основная теорема арифметики, теорема евклида, НОД и НОК, свойства НОД и НОК, взаимно простые числа*

----

<br>

### Основная теорема арифметики

**Теорема.** Каждое положительное целое число $n \gt 1$ может быть записано в виде произведения простых чисел: $n = p_1 p_2 \dots p_m$. Эта запись единственна с точностью до порядка множителей. Можно сгруппировать одинаковые множители и получить запись вида $n = p_1^{\epsilon_1} p_2^{\epsilon_2} \dots p_k^{\epsilon_k}$. Аналогичное (и тоже единственное с точностью до порядка множителей) разложение можно сделать для рациональных чисел.

(Доказательство основной теоремы арифметики будет дано позже. Первая её часть кажется довольно очевидной, однако со второй всё не так просто. Например, рассмотрим вот такое множество $S = \{4k + 1 \mid k = 0,\,1,\,\dots\}$. Индукцией по $k$ можно доказать существование разложения для чисел из $S$ на *квазипростые числа* — те, которые нельзя разложить ещё сильнее и они представляются просто как $4k+1$, но я вообще не понял, как это доказывать, и как делать индукционный переход. Но при этом нет единственности такого разложения: например, $441 = 9 \times 49 = 21^2$. Так что для просто целых чисел единственность тоже не особо очевидна.)

**Теорема Евклида.** Множество всех простых чисел бесконечно. Если бы существовало конечное множество $P = \{p_1, p_2, \dots, p_n\}$ простых чисел, то по предыдущей теореме число $c = p_1 p_2 \dots p_n + 1$ делилось бы хотя бы на одно из чисел из $P$ (НУО, пусть это будет $p_1$, то есть $c = p_1 c'$). Тогда:

$$
p_1 c' = p_1 p_2 \dots p_n + 1 \\
p_1 (c' - p_2 \dots p_n) = 1
$$

Однако последнее равенство невозможно, потому что делителем единицы может быть только $\pm1$, а $p_1 \not = 1$.

----

<br>

### НОД и НОК в $\mathbb{Z}$

**Определения наибольшего общего делителя и наименьшего общего кратного** через основную теорему арифметики. Пусть у нас есть целые числа $m$ и $n$, которые раскладываются на простые следующим образом: $n = \pm p_1^{\alpha_1} \dots p_k^{\alpha_k}$ и $m = \pm p_1^{\beta_1} \dots p_k^{\beta_k}$ (для каждого из чисел выписываем все простые, которые делят и то, и другое число, пихаем нули в степени просто, если что). Тогда НОК и НОД определяются вот так:

- НОД$(n, m) = p_1^{\min(\alpha_1, \beta_1)}\dots p_k^{\min(\alpha_k, \beta_k)}$
- НОК$(n, m) = p_1^{\max(\alpha_1, \beta_1)}\dots p_k^{\max(\alpha_k, \beta_k)}$

**Свойства НОД и НОК:**

- НОД$(n,m) \mid n$ и НОД$(n,m) \mid m$ (следует просто по смыслу и из определения).

- Если $d \mid n$ и $d \mid m$, то $d \mid \text{НОД}(n, m)$ (потому что, если $d$ делит и $m$, и $n$, то это означает, что в нём вхождений каждого простого числа меньше или равно минимуму вхождений для $m$ и $n$). *То есть, если есть какой-то общий делитель двух чисел, то он будет делить и их наибольший общий делитель.*

- $n \mid \text{НОК}(n, m)$ и $m \mid \text{НОК}(n,m)$ (просто по определению).

- Если $n \mid d$ и $m \mid d$, то $\text{НОК}(n, m) \mid d$ (ну тут такое же объяснение, как и для аналогичного утверждения для НОД, это всё видно из разложения на простые числа). *То есть наименьшее кратное двух чисел делит любое число кратное обоим этим числам.*

- Очевидно, если перемножить НОД и НОК двух чисел, то получится просто произведение этих двух чисел (потому что одно берёт минимумы, другое — максимумы, если всё свалить вместе, то можно будет собрать оба числа): $\text{НОД}(n,m) \times \text{НОК}(m, n) = n \times m$. (Ну, формально тут надо ещё указать, что надо, чтобы $n \gt 0$ и $m \gt 0$)

Числа называются **взаимно простыми**, если их НОД равен 1.

----

<br>

### Алгоритм деления в $\mathbb{Z}$

**Теорема про деление с остатком.** Для любых $a, b \in \mathbb{Z},\,b \gt 0$ найдутся такие $q,\,r \in \mathbb{Z}$, что:

$$
a = bq + r,\,\,\,\, 0 \leq r \lt b
$$

(А, если позволить $b$ быть *и отрицательным*, то условие для $r$ будет вот таким: $0 \leq r \lt \|b\|$.)

*Доказательство.* Рассмотрим вот такое множество $S = \{a-bs \mid s \in \mathbb{Z},\, a-bs \geq 0\}$ (короче, это все неотрицательные числа, которые получаются последовательными вычитанием и прибавлением $b$ к $a$). Очевидно, это множество непустое, по крайней мере можно взять $s = -a^2$ и тогда $a + ba^2 = a(1 + ab) \geq 0$, потому что, если $a \lt 0$, то $ab \leq -1$.

Раз множество непустое, то можно выбрать наименьший его элемент (или только инфимум? ну, это детали), который обозначим за $r = a - bq$, который по определению $S$ будет неотрицательным. Пойдём от противного: предположим, что $r \geq b \implies r - b = a - b(q + 1) \geq 0$ — это тоже элемент множества $S$ и он меньше $r$, что противоречит с тем, что $r$ — наименьший элементт S.

<br>

**Альтернативное определение НОД и разложение НОД.** Рассмотрим множество линейных комбинаций целых чисел $m$ и $n$ (*таких, что они одновременно не равны нулю*): $J = \{nu + mv \mid u,v \in \mathbb{Z}\}$. Выберем в этом множестве наименьший *положительный* элемент $d = nu_0 + mv_0$. А теперь разделим $n$ на это вот $d$:

$$
n = dq + r,\,\, 0 \leq r \lt d \\
r = n - dq = n - (nu_0 + mv_0)q = n(1 - u_0q) + m(-v_0q) \in J
$$

То есть остаток от деления $n$ на $d$ попадает в это множество $J$. НО остаток от деления меньше, чем $d$, так что он может только равняться нулю, потому что иначе было бы противоречие с тем, что $d$ — наименьший положительный элемент $J$. А раз остаток от деления равен нулю, то $d \mid n$. Аналогично $d \mid m$. И при этом ещё, если есть какой-то другой делитель $d' \mid n,\,\,d' \mid m$, то он будет делить и $d$: $d' \mid d = nu_0 + mv_0$.

Таким образом, $d$ удовлетворяет всем характеристическим свойствам НОД, так что можно вот так определить НОД как **наименьшую неотрицательную линейную комбинацию чисел**. В частности, два числа являются взаимно простыми тогда и только тогда, когда $mu + nv = 1$ для некоторых $u,v \in \mathbb{Z}$.

Отсюда же следует обоснование для алгоритма Евклида (на самом деле, нет). Чтобы найти НОД двух чисел, надо взять какой-то элемент $J$ и последовательно его уменьшать, вычитая из него другие элементы $J$ (элементы $J$ замкнуты относительно плюса и минуса). Хотя, нет, как-то не очень, мда, там можно гораздо проще доказать, что алгоритм Евклида корректен.

