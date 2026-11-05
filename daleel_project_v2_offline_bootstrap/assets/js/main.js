/* ==========================================================
   assets/js/main.js - سكربت الموقع (يُحمَّل في كل الصفحات)
   ========================================================== */

/* ---------- صفحة اتصل بنا ---------- */

// عرض رسالة Bootstrap Alert في صفحة اتصل بنا
function showAlert(type, text) {
    var box = document.getElementById("formMessage");
    box.className = "alert alert-" + type + " mt-3";
    box.innerHTML = text;
    box.style.display = "block";
}

// التحقق من نموذج اتصل بنا
function checkForm() {
    var name = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var emailPosition = email.search(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}$/);

    if (name == "" || email == "" || message == "") {
        showAlert("danger", "يرجى تعبئة جميع الحقول.");
        return false;
    }

    if (emailPosition != 0) {
        showAlert("danger", "يرجى إدخال بريد إلكتروني صحيح.");
        return false;
    }

    showAlert("success", "تم التحقق من البيانات بنجاح.");
    return false;
}

/* ---------- بيانات الفعاليات (للتجربة: عدّل التواريخ والنصوص كما تريد) ---------- */

// مكان الدبوس على الخريطة (نسبة من عرض الصورة وارتفاعها)
var PLACES = {
    "المركز الثقافي": { x: 27.5, y: 16.7 },
    "قاعة المعارض": { x: 72.5, y: 13.3 },
    "المسرح الجامعي": { x: 78.75, y: 43.3 },
    "الساحة الرئيسية": { x: 45, y: 40 },
    "قاعة الأنشطة": { x: 21.25, y: 50 },
    "الملعب الجامعي": { x: 23.75, y: 74.3 },
    "مرسم الكلية": { x: 50, y: 71.7 },
    "قاعة الموسيقى": { x: 81.25, y: 73.3 }
};

var IMAGES = ["event-students.jpg", "event-digital.jpg", "event-sport.jpg", "image2.jpg"];

// تصنيف الفعالية -> اسم الفلتر في صفحة الفعاليات
var CATEGORY_GROUP = {
    "ثقافة وفنون": "culture",
    "ثقافة ومجتمع": "culture",
    "فنون ورسم": "culture",
    "رياضة": "sport",
    "تكنولوجيا": "tech",
    "موسيقى": "music",
    "عائلي واجتماعي": "family"
};

var EVENTS = [
    {
        id: 1, title: 'أمسية الشعر والقصة', emoji: '📖', category: 'ثقافة وفنون',
        place: 'المركز الثقافي', date: '2026-11-07', start: '18:00', end: '20:30',
        days: 1, status: 'today', image: 'event-students.jpg',
        summary: 'قراءات أدبية من كتّاب وطلاب الجامعة.',
        desc: [
            'تفتح الجامعة أبواب المركز الثقافي لأمسية أدبية تجمع كتّابًا وشعراء من أبناء الجامعة وطلابها، لقراءة نصوص شعرية وقصصية قصيرة بصوت أصحابها.',
            'تتخلل الأمسية فقرات حوارية قصيرة مع المشاركين، ويمكن للحضور تقديم مشاركاتهم الخاصة في فقرة المنصة المفتوحة.'
        ],
        highlights: ['قراءات شعرية وقصصية مباشرة', 'منصة مفتوحة لمشاركات الحضور', 'لقاء قصير مع الكتّاب بعد الأمسية']
    },
    {
        id: 2, title: 'معرض المشاريع الطلابية', emoji: '💡', category: 'تكنولوجيا',
        place: 'قاعة المعارض', date: '2026-11-08', start: '10:00', end: '16:00',
        days: 2, status: 'soon', image: 'event-digital.jpg',
        summary: 'عرض مشاريع التخرج والأعمال الإبداعية للطلاب.',
        desc: [
            'معرض يعرض أبرز مشاريع التخرج والأعمال الإبداعية لطلاب الجامعة في مجالات التقنية والتصميم والعلوم.',
            'يشرح أصحاب المشاريع أفكارهم للزوار، وتتابع لجنة من أعضاء الهيئة التدريسية الأعمال المشاركة.'
        ],
        highlights: ['عرض مباشر لمشاريع التخرج', 'لقاء مع أصحاب المشاريع', 'متابعة من لجنة أكاديمية']
    },
    {
        id: 3, title: 'أمسية موسيقية', emoji: '🎵', category: 'موسيقى',
        place: 'المسرح الجامعي', date: '2026-11-09', start: '19:00', end: '21:00',
        days: 1, status: 'soon', image: 'event-sport.jpg',
        summary: 'عروض موسيقية حية بمشاركة فرق الجامعة.',
        desc: [
            'أمسية موسيقية حية تقدّمها فرق الجامعة بأنماط متنوعة تجمع بين الموسيقى الشرقية والمعاصرة.',
            'تضم الأمسية عروضًا لعدة فرق، وتُختتم بفقرة مشتركة يجتمع فيها العازفون على خشبة المسرح.'
        ],
        highlights: ['عروض حية لفرق الجامعة', 'أنماط موسيقية متنوعة', 'فقرة ختامية مشتركة']
    },
    {
        id: 4, title: 'يوم العائلة الجامعي', emoji: '👨‍👩‍👧‍👦', category: 'عائلي واجتماعي',
        place: 'الساحة الرئيسية', date: '2026-11-11', start: '10:00', end: '15:00',
        days: 1, status: 'soon', image: 'event-students.jpg',
        summary: 'أنشطة وألعاب للطلاب وعائلاتهم.',
        desc: [
            'يوم مفتوح يدعو الطلاب لاصطحاب عائلاتهم والتعرّف على أجواء الحياة الجامعية من خلال ألعاب وأنشطة مناسبة لجميع الأعمار.',
            'تُقام في الساحة الرئيسية ألعاب جماعية وركن للأطفال، مع جولة تعريفية بمرافق الجامعة.'
        ],
        highlights: ['ألعاب وأنشطة لكل الأعمار', 'ركن مخصص للأطفال', 'جولة تعريفية بمرافق الجامعة']
    },
    {
        id: 5, title: 'ورشة المهارات الرقمية', emoji: '💻', category: 'تكنولوجيا',
        place: 'قاعة الأنشطة', date: '2026-11-08', start: '13:00', end: '15:30',
        days: 1, status: 'soon', image: 'event-digital.jpg',
        summary: 'ورشة للتعرّف على أدوات رقمية مفيدة للدراسة والعمل.',
        desc: [
            'ورشة عملية تعرّف المشاركين بأدوات رقمية تساعدهم في الدراسة والعمل، مثل تنظيم المهام وإدارة الملفات والبحث عن المعلومات.',
            'يُنصح بإحضار حاسوب محمول أو جهاز لوحي للتطبيق خلال الورشة.'
        ],
        highlights: ['تطبيق عملي على أدوات رقمية', 'تنظيم الوقت والمهام', 'البحث وإدارة المعلومات']
    },
    {
        id: 6, title: 'ملتقى الطلاب', emoji: '🤝', category: 'ثقافة ومجتمع',
        place: 'المركز الثقافي', date: '2026-11-10', start: '17:00', end: '19:00',
        days: 1, status: 'soon', image: 'event-students.jpg',
        summary: 'لقاء للتعارف وتبادل الأفكار بين الطلاب.',
        desc: [
            'لقاء مفتوح يجمع الطلاب من مختلف التخصصات للتعارف وتبادل الأفكار والخبرات الجامعية.',
            'تتضمن الجلسة نقاشات في مجموعات صغيرة حول موضوعات تهم الطلاب، ومبادرات يمكن العمل عليها معًا.'
        ],
        highlights: ['تعارف بين طلاب التخصصات المختلفة', 'نقاش في مجموعات صغيرة', 'أفكار لمبادرات طلابية']
    },
    {
        id: 7, title: 'يوم النشاط الرياضي', emoji: '⚽', category: 'رياضة',
        place: 'الملعب الجامعي', date: '2026-11-12', start: '09:00', end: '14:00',
        days: 1, status: 'soon', image: 'event-sport.jpg',
        summary: 'أنشطة رياضية تشجّع على الحركة والعمل الجماعي.',
        desc: [
            'يوم رياضي يشجّع الطلاب على الحركة والعمل الجماعي من خلال مباريات ومسابقات ودية.',
            'المشاركة مفتوحة لجميع مستويات اللياقة، ويُفضّل ارتداء ملابس رياضية مريحة.'
        ],
        highlights: ['مباريات ودية بين الفرق', 'مسابقات جماعية', 'مشاركة لجميع المستويات']
    },
    {
        id: 8, title: 'ورشة الفنون التشكيلية', emoji: '🎨', category: 'فنون ورسم',
        place: 'مرسم الكلية', date: '2026-11-13', start: '11:00', end: '14:00',
        days: 1, status: 'soon', image: 'event-digital.jpg',
        summary: 'جلسة رسم وتصميم تعبيري لتطوير المهارات البصرية.',
        desc: [
            'جلسة رسم وتصميم تعبيري تتيح للمشاركين تجربة تقنيات بصرية مختلفة وتطوير أسلوبهم الخاص.',
            'يرافق المشاركين مشرف فني يقدّم ملاحظاته خلال العمل.'
        ],
        highlights: ['تجربة تقنيات رسم متنوعة', 'تصميم تعبيري حر', 'ملاحظات من مشرف فني']
    },
    {
        id: 9, title: 'ورشة العزف والموسيقى', emoji: '🎸', category: 'موسيقى',
        place: 'قاعة الموسيقى', date: '2026-11-14', start: '16:00', end: '18:30',
        days: 1, status: 'soon', image: 'event-sport.jpg',
        summary: 'تدريبات جماعية على الآلات الموسيقية والتناغم الصوتي.',
        desc: [
            'تدريبات جماعية على الآلات الموسيقية تهدف إلى تطوير مهارات العزف والتناغم بين أفراد الفرقة.',
            'تناسب الورشة المبتدئين ومن لديهم خبرة سابقة على حد سواء.'
        ],
        highlights: ['تدريب جماعي على الآلات', 'تمارين على التناغم الصوتي', 'مناسبة للمبتدئين والمتقدمين']
    }
];

var dayNames = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
var monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

/* ---------- دوال مساعدة ---------- */

// مثال: formatDate("2026-11-07", 0, true) -> السبت 7 نوفمبر 2026
function formatDate(dateText, extraDays, withYear) {
    var d = new Date(dateText + "T12:00:00");
    d.setDate(d.getDate() + extraDays);
    var result = dayNames[d.getDay()] + " " + d.getDate() + " " + monthNames[d.getMonth()];
    if (withYear) {
        result = result + " " + d.getFullYear();
    }
    return result;
}

// مثال: formatTime("18:00") -> 6:00 م
function formatTime(t) {
    var parts = t.split(":");
    var hour = parseInt(parts[0], 10);
    var suffix = "ص";
    if (hour >= 12) {
        suffix = "م";
    }
    hour = hour % 12;
    if (hour == 0) {
        hour = 12;
    }
    return hour + ":" + parts[1] + " " + suffix;
}

function getEventById(id) {
    for (var i = 0; i < EVENTS.length; i++) {
        if (EVENTS[i].id == id) {
            return EVENTS[i];
        }
    }
    return null;
}

// مثال: makeCalendarDate("2026-11-07", "18:00") -> 20261107T180000
function makeCalendarDate(date, time) {
    return date.replace(/-/g, "") + "T" + time.replace(":", "") + "00";
}

/* ---------- زر أضف للتقويم ---------- */

function downloadCalendar(ev) {
    var text = "BEGIN:VCALENDAR\r\n";
    text += "VERSION:2.0\r\n";
    text += "BEGIN:VEVENT\r\n";
    text += "UID:event-" + ev.id + "@events-guide\r\n";
    text += "DTSTAMP:" + makeCalendarDate(ev.date, ev.start) + "\r\n";
    text += "DTSTART:" + makeCalendarDate(ev.date, ev.start) + "\r\n";
    text += "DTEND:" + makeCalendarDate(ev.date, ev.end) + "\r\n";
    text += "SUMMARY:" + ev.title + "\r\n";
    text += "LOCATION:" + ev.place + "\r\n";
    text += "DESCRIPTION:" + ev.summary + "\r\n";
    if (ev.days > 1) {
        text += "RRULE:FREQ=DAILY;COUNT=" + ev.days + "\r\n";
    }
    text += "END:VEVENT\r\n";
    text += "END:VCALENDAR\r\n";

    var link = document.createElement("a");
    link.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(text);
    link.download = "event-" + ev.id + ".ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getGoogleCalendarLink(ev) {
    var link = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    link += "&text=" + encodeURIComponent(ev.title);
    link += "&dates=" + makeCalendarDate(ev.date, ev.start) + "/" + makeCalendarDate(ev.date, ev.end);
    link += "&details=" + encodeURIComponent(ev.summary);
    link += "&location=" + encodeURIComponent(ev.place);
    if (ev.days > 1) {
        link += "&recur=" + encodeURIComponent("RRULE:FREQ=DAILY;COUNT=" + ev.days);
    }
    return link;
}

/* ---------- زر شارك ---------- */

function shareEvent(ev) {
    if (navigator.share) {
        navigator.share({ title: ev.title, text: ev.summary, url: window.location.href });
    } else {
        prompt("انسخ رابط الفعالية:", window.location.href);
    }
}

/* ---------- أجزاء صفحة التفاصيل ---------- */

function makeFact(icon, label, valueHtml) {
    return '<li class="event-fact"><span class="fact-icon">' + icon + '</span>' +
        '<div><span class="fact-label">' + label + '</span>' + valueHtml + '</div></li>';
}

function showGallery(ev) {
    var gallery = document.getElementById("gallery");
    var heroImg = document.getElementById("heroImg");

    // الصورة الخاصة بالفعالية أولًا ثم باقي الصور
    var files = [ev.image];
    for (var i = 0; i < IMAGES.length; i++) {
        if (IMAGES[i] != ev.image) {
            files.push(IMAGES[i]);
        }
    }

    var html = "";
    for (var j = 0; j < files.length; j++) {
        var cls = "gallery-thumb";
        if (j == 0) {
            cls = "gallery-thumb active";
        }
        html += '<button type="button" class="' + cls + '" data-file="' + files[j] + '">' +
            '<img src="assets/img/' + files[j] + '" alt="صورة ' + (j + 1) + ' من الفعالية"></button>';
    }
    gallery.innerHTML = html;

    var buttons = gallery.getElementsByTagName("button");
    for (var k = 0; k < buttons.length; k++) {
        buttons[k].onclick = function () {
            for (var m = 0; m < buttons.length; m++) {
                buttons[m].classList.remove("active");
            }
            this.classList.add("active");
            heroImg.src = "assets/img/" + this.getAttribute("data-file");
        };
    }
}

function showRelated(ev) {
    var related = [];

    // أولًا الفعاليات من نفس التصنيف
    for (var i = 0; i < EVENTS.length; i++) {
        if (EVENTS[i].id != ev.id && EVENTS[i].category == ev.category) {
            related.push(EVENTS[i]);
        }
    }

    // ثم باقي الفعاليات بالترتيب
    for (var k = 1; k < EVENTS.length; k++) {
        var other = EVENTS[(ev.id - 1 + k) % EVENTS.length];
        if (other.category != ev.category) {
            related.push(other);
        }
    }

    related = related.slice(0, 3);

    var html = "";
    for (var j = 0; j < related.length; j++) {
        var r = related[j];
        html += '<div class="col-12 col-md-6 col-lg-4">' +
            '<div class="latest-card h-100">' +
            '<div class="latest-date">' +
            '<span class="badge bg-success">' + r.category + '</span>' +
            '<p class="latest-day">' + formatDate(r.date, 0, false) + '</p>' +
            '</div>' +
            '<h3>' + r.title + '</h3>' +
            '<p>' + r.summary + '</p>' +
            '<p class="latest-place">📍 ' + r.place + '</p>' +
            '<a href="event.html?id=' + r.id + '" class="btn btn-primary btn-sm stretched-link">التفاصيل</a>' +
            '</div></div>';
    }
    document.getElementById("relatedList").innerHTML = html;
}

/* ---------- صفحة تفاصيل الفعالية (event.html?id=1) ---------- */

function showEventPage() {
    var id = new URLSearchParams(window.location.search).get("id");
    var ev = getEventById(id);

    // إذا كان الرقم غير صحيح
    if (ev == null) {
        document.title = "الفعالية غير موجودة - دليل فعاليات الجامعة الافتراضية";
        document.getElementById("eventTitle").textContent = "الفعالية غير موجودة";
        document.getElementById("crumbTitle").textContent = "غير موجودة";
        document.getElementById("eventSubtitle").textContent = "تأكد من الرابط أو تصفّح قائمة الفعاليات.";
        document.getElementById("notFound").style.display = "block";
        return;
    }

    // التاريخ والوقت
    var dateText = formatDate(ev.date, 0, true);
    var timeText = formatTime(ev.start) + " - " + formatTime(ev.end);
    if (ev.days > 1) {
        dateText = "من " + formatDate(ev.date, 0, false) + " إلى " + formatDate(ev.date, ev.days - 1, false);
        timeText = timeText + " (يوميًا)";
    }

    // العنوان
    document.title = ev.title + " - دليل فعاليات الجامعة الافتراضية";
    document.getElementById("eventTitle").textContent = ev.title;
    document.getElementById("crumbTitle").textContent = ev.title;
    document.getElementById("eventSubtitle").textContent = dateText + " - " + ev.place;

    var badge = document.getElementById("statusBadge");
    if (ev.status == "today") {
        badge.textContent = "الحدث اليوم";
        badge.className = "badge mb-2 bg-danger";
    } else {
        badge.textContent = "قريبًا";
        badge.className = "badge mb-2 bg-secondary";
    }

    // الصورة والمعرض
    var heroImg = document.getElementById("heroImg");
    heroImg.src = "assets/img/" + ev.image;
    heroImg.alt = ev.title;
    showGallery(ev);

    // الوصف
    var descHtml = "";
    for (var i = 0; i < ev.desc.length; i++) {
        descHtml += "<p>" + ev.desc[i] + "</p>";
    }
    document.getElementById("eventDesc").innerHTML = descHtml;

    var listHtml = "";
    for (var j = 0; j < ev.highlights.length; j++) {
        listHtml += "<li>" + ev.highlights[j] + "</li>";
    }
    document.getElementById("highlights").innerHTML = listHtml;

    // معلومات سريعة
    var categoryLink = '<a class="fact-value" href="events.html?cat=' + CATEGORY_GROUP[ev.category] + '">' + ev.category + '</a>';
    var facts = "";
    facts += makeFact("📅", "التاريخ", '<span class="fact-value">' + dateText + "</span>");
    facts += makeFact("🕒", "الوقت", '<span class="fact-value">' + timeText + "</span>");
    facts += makeFact("📍", "المكان", '<span class="fact-value">' + ev.place + "</span>");
    facts += makeFact("🏷️", "التصنيف", categoryLink);
    document.getElementById("eventFacts").innerHTML = facts;

    // الخريطة
    var pos = PLACES[ev.place];
    var pin = document.getElementById("mapPin");
    if (pos) {
        pin.style.left = pos.x + "%";
        pin.style.top = pos.y + "%";
    } else {
        pin.style.display = "none";
    }
    document.getElementById("mapCaption").textContent = ev.place + " - موقع الفعالية على خريطة الحرم الجامعي";

    // الأزرار
    document.getElementById("gcalLink").href = getGoogleCalendarLink(ev);
    document.getElementById("icsBtn").onclick = function () {
        downloadCalendar(ev);
    };
    document.getElementById("shareBtn").onclick = function () {
        shareEvent(ev);
    };

    showRelated(ev);

    document.getElementById("eventContent").style.display = "block";
    document.getElementById("relatedSection").style.display = "block";
}

/* ---------- فلتر الفعاليات (events.html?cat=music) ---------- */

function filterEvents(key) {
    var cards = document.getElementById("eventsGrid").children;
    var buttons = document.getElementById("eventFilters").getElementsByTagName("button");
    var shown = 0;

    for (var i = 0; i < cards.length; i++) {
        if (key == "all" || cards[i].getAttribute("data-category") == key) {
            cards[i].style.display = "block";
            shown++;
        } else {
            cards[i].style.display = "none";
        }
    }

    for (var j = 0; j < buttons.length; j++) {
        if (buttons[j].getAttribute("data-filter") == key) {
            buttons[j].classList.add("active");
        } else {
            buttons[j].classList.remove("active");
        }
    }

    var count = document.getElementById("resultCount");
    if (key == "all") {
        count.textContent = "جميع الفعاليات (" + shown + ")";
    } else {
        count.textContent = "عدد الفعاليات في هذا التصنيف: " + shown;
    }

    if (shown == 0) {
        document.getElementById("noResults").style.display = "block";
    } else {
        document.getElementById("noResults").style.display = "none";
    }
}

function setupFilter() {
    var buttons = document.getElementById("eventFilters").getElementsByTagName("button");
    var key = new URLSearchParams(window.location.search).get("cat");
    var found = false;

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            filterEvents(this.getAttribute("data-filter"));
        };
        if (buttons[i].getAttribute("data-filter") == key) {
            found = true;
        }
    }

    if (found == false) {
        key = "all";
    }
    filterEvents(key);
}

/* ---------- تشغيل كل صفحة ---------- */

if (document.getElementById("eventContent")) {
    showEventPage();
}

if (document.getElementById("eventsGrid")) {
    setupFilter();
}