//CV in hero section CTA
//انا حاسس انهم ضخم اوي يعني بس واخدين width عامل ازاي حاسس حجمهم عملاق يعني خليهم كدا container يبقي مثلا 70%
وهم جوا الcontainer ده
// الصورة الشخصية
// live demo , link githup
//اليمل والكونتكت
وكمان زرار الback to portfolio
خليه لما ننزل شوية كدا بالسكرول يبقي معانا كدا مش لازم اليوزر يعمل سكرول فوق تاني عشان يطلع

ونفس التغيرات دي برضو اعملها في ## Certificates & achievements.
وخلي الزرار اسمه view all achivements مش Certificattions

# دليل إدارة محتوى البورتفوليو

هذا البورتفوليو يعمل بطريقة **Data-driven**.

بمعنى أنك غالبًا لن تحتاج إلى تعديل مكونات React أو تصميم الصفحات. كل ما عليك هو تعديل البيانات داخل:

```text
src/data/portfolio.ts
```

ضع الصور داخل:

```text
public/images/projects/
public/certificates/
```

بعد أي تعديل شغّل:

```bash
npm run build
```

إذا ظهر خطأ TypeScript، راجع اسم الحقل أو نوع القيمة قبل تشغيل الموقع.

---

## 1. إضافة مشروع جديد

افتح الملف:

ابحث عن:

```ts
export const projects: Project[] = [
```

أضف كائن المشروع داخل المصفوفة، ويفضل وضعه بعد المشروع الذي تريد أن يسبقه مباشرة.

### قالب مشروع جاهز

```ts
| `description` | `string` | لا | نبذة عن الشهادة أو البرنامج |
| `achievements` | `string[]` | لا | ما الذي نفذته أو حققته خلال الشهادة |
| `skills` | `string[]` | لا | المهارات والتقنيات التي تعلمتها |
{
  id: "my-new-project",
  title: "اسم المشروع",
  tagline: "جملة قصيرة تصف المشروع",
  year: 2026,
  category: "Web App",
  description:
    "وصف مختصر للمشروع: ما المشكلة التي يحلها؟ ولمن تم بناؤه؟",
  image: "/images/projects/my-new-project-1.png",
  technologies: ["React", "TypeScript", "Tailwind CSS"],
  liveDemo: "https://example.com",
  github: "https://github.com/Mohamedmostafa110/my-new-project",
  featured: false,
  caseStudy: {
    problem: "ما المشكلة أو الاحتياج الذي يعالجه المشروع؟",
    role: "ما دورك في المشروع؟",
    architecture: [
      "كيف تم تقسيم المشروع؟",
      "ما أهم أجزاء النظام؟",
      "كيف تتواصل المكونات مع بعضها؟",
### ترتيب وعدد الشهادات
    decisions: [
      "ما القرارات التقنية المهمة التي اتخذتها؟",
      "لماذا اخترت هذه الأدوات؟",
    ],
    thinking: "اختياري: اشرح طريقة التفكير وراء الحل.",
    challenges: "اختياري: ما أصعب تحدٍ واجهته؟",
    outcome: "اختياري: ما النتيجة التي وصلت إليها؟",
    lessons: "اختياري: ماذا تعلمت من المشروع؟",
  },
},
```

### الحقول المطلوبة

| الحقل          | النوع      | الشرح                                                              |
| -------------- | ---------- | ------------------------------------------------------------------ |
| `id`           | `string`   | معرف فريد للمشروع، استخدم حروفًا صغيرة وشرطات مثل `my-new-project` |
| `title`        | `string`   | اسم المشروع                                                        |
| `tagline`      | `string`   | وصف قصير يظهر بجانب اسم المشروع                                    |
| `year`         | `number`   | سنة المشروع، بدون علامات اقتباس                                    |
| `category`     | `string`   | واحدة من: `Web App` أو `Platform` أو `Desktop` أو `Embedded`       |
| `description`  | `string`   | الوصف الرئيسي للمشروع                                              |
| `technologies` | `string[]` | التقنيات المستخدمة                                                 |
| `caseStudy`    | `object`   | تفاصيل دراسة الحالة                                                |

داخل `caseStudy` الحقول المطلوبة هي:

- `problem`
- `role`
- `architecture` كمصفوفة نصوص
- `decisions` كمصفوفة نصوص

والحقول التالية اختيارية ويمكن حذفها إذا لم تكن جاهزة:

- `thinking`
- `challenges`
- `outcome`
- `lessons`

### الصور والروابط

ضع صورة المشروع في:

```text
public/images/projects/my-new-project-1.png
```

ثم اكتب المسار هكذا:

```ts
image: "/images/projects/my-new-project-1.png",
```

إذا لم تكن لديك صورة بعد، يمكنك حذف حقل `image`، وسيظهر placeholder تلقائيًا.

إذا لم يكن هناك رابط Demo أو GitHub، احذف الحقل أو اترك قيمته `"#"`، وسيتم إخفاء الرابط من الواجهة.

---

## 2. ترتيب المشاريع وعدد المشاريع الظاهرة

ترتيب المشاريع في الموقع هو نفس ترتيبها داخل مصفوفة `projects`.

```ts
export const projects: Project[] = [projectOne, projectTwo, projectThree];
```

حاليًا طريقة العرض هي:

- الشاشة الكبيرة تعرض أول 7 مشاريع.
- الشاشة الصغيرة تعرض أول 5 مشاريع.
- إذا كان عدد المشاريع أكبر من الحد، يظهر زر `View all projects`.
- عند الضغط عليه تظهر كل المشاريع.
- يظهر زر `Back to portfolio` للعودة إلى العرض المختصر.

لذلك إذا أردت تغيير أولوية المشاريع، حرّك الكائنات داخل مصفوفة `projects` إلى الترتيب الذي تريده.

### المشروع المميز

إذا أضفت:

```ts
featured: true,
```

سيظهر المشروع بتصميم أكبر في بداية قسم المشاريع.

يفضل أن يكون المشروع المميز من أوائل العناصر التي تظهر في المصفوفة، ويفضل أن يكون داخل أول 7 مشاريع حتى يظهر على الشاشة الكبيرة وداخل أول 5 حتى يظهر على الشاشة الصغيرة.

استخدم `featured: true` لمشروع واحد فقط.

---

## 3. إضافة شهادة

ضع ملف PDF الحقيقي في `public/certificates/`، ثم أضف object إلى مصفوفة `certificates` في `src/data/portfolio.ts`:

```ts
{
  id: "iti-react-training",
  title: "React Training Certificate",
  issuer: "Information Technology Institute (ITI)",
  description: "Documents React training through ITI.",
  category: "Frontend Development",
  pdfUrl: "/certificates/iti-react-training-certificate.pdf",
}
```

يتضمن كل object الحقول `id`, `title`, `issuer`, `description`, `category`, و`pdfUrl`. اختياريًا، استخدم `featured: true` لتمييز دبلومة التخرج. يفتح زر `View Certificate` ملف PDF في تبويب جديد. لا تضف تاريخًا أو معرفًا أو رابط تحقق إلا إذا كان موثقًا في الشهادة.

---

## 4. إضافة مهارة

ابحث عن:

```ts
export const skillGroups: SkillGroup[] = [
```

### إضافة مهارة إلى مجموعة موجودة

```ts
{
  label: "Frontend",
  note: "Interfaces",
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
  ],
},
```

أضف اسم المهارة داخل `skills` فقط.

### إضافة مجموعة مهارات جديدة

```ts
{
  label: "Testing",
  note: "Quality",
  skills: ["Vitest", "Jest", "Playwright"],
},
```

---

## 5. إضافة خبرة أو مرحلة في الرحلة

ابحث عن:

```ts
export const journey: JourneyEntry[] = [
```

أضف عنصرًا بهذا الشكل:

```ts
{
  period: "2026",
  title: "Frontend Developer",
  organization: "Company or program name",
  description: "وصف مختصر للتجربة أو المرحلة.",
  tags: ["React", "Teamwork"],
},
```

الحقول المطلوبة:

- `period`
- `title`
- `organization`
- `description`

وحقل `tags` اختياري.

---

## 6. تعديل الخدمات

الخدمات موجودة في نفس الملف داخل:

```ts
export const services: Service[] = [
```

كل خدمة تحتاج إلى:

```ts
{
  icon: "website",
  title: "عنوان الخدمة",
  description: "وصف الخدمة.",
},
```

قيم `icon` المدعومة حاليًا هي:

- `interface`
- `experience`
- `website`
- `integration`
- `fullstack`

لا تكتب قيمة مختلفة لـ `icon` إلا إذا أضفت دعمها في مكون الخدمات.

---

## 7. تعديل بيانات الحسابات والموقع

بيانات الاسم والإيميل والحسابات موجودة في:

```text
src/config/site.ts
```

مثال:

```ts
export const site = {
  name: "Mohamed Mostafa",
  email: "momostafa8316@gmail.com",
  github: "https://github.com/Mohamedmostafa110",
  linkedin: "https://www.linkedin.com/in/mohamed-mostafa00/",
  location: "Egypt — open to remote work",
  availability: "Available for freelance & collaboration",
};
```

روابط Footer موجودة أيضًا داخل `socials` في:

```text
src/data/portfolio.ts
```

إذا غيّرت حساباتك مستقبلًا، حدّث المصدرين حتى تظل كل الروابط متطابقة.

---

## 8. قواعد مهمة قبل الحفظ

1. كل عنصر داخل المصفوفة يجب أن ينتهي بفاصلة إذا كان بعده عنصر آخر.
2. لا تستخدم نفس `id` لأكثر من مشروع.
3. قيمة `year` في المشاريع رقم، مثل `2026`، وليست نصًا.
4. قيمة `year` في الشهادات نص، مثل `"2026"`.
5. مسار الصورة يبدأ بـ `/images/...` لأنه يشير إلى مجلد `public`.
6. استخدم اقتباسات حول النصوص والروابط.
7. لا تحذف `caseStudy` من المشروع، حتى لو كانت بعض تفاصيله مؤقتة.
8. اترك ترتيب المصفوفات حسب الأولوية التي تريد ظهورها بها.

---

## 9. اختبار التعديلات

بعد إضافة مشروع أو شهادة أو أي بيانات أخرى، افتح PowerShell داخل مجلد المشروع:

```powershell
cd "portfolio KIMI"
npm run build
```

لتشغيل الموقع أثناء التطوير:

```powershell
cd "portfolio KIMI"
npm run dev
```

ثم افتح الرابط الذي يظهر في الطرفية، وغالبًا يكون:

```text
http://localhost:5173
```

إذا نجح `npm run build`، فهذا يعني أن TypeScript قبل البيانات وأن المشروع قابل للبناء.

للتنسيق وفحص الكود:

```powershell
npm run format
npm run lint
```

---

## الخلاصة السريعة

لإضافة مشروع:

1. أضف صورته إلى `public/images/projects/`.
2. أضف object جديدًا داخل `projects`.
3. رتّبه في المكان الذي تريده.
4. شغّل `npm run build`.

لإضافة شهادة:

1. أضف ملف PDF إلى `public/certificates/`.
2. أضف object جديدًا داخل `certificates`.
3. رتّبها حسب الأولوية.
4. شغّل `npm run build`.

أنت بذلك تتعامل مع الموقع كأنك تدخل بيانات فقط، بينما المكونات تتولى العرض والتصميم تلقائيًا.
