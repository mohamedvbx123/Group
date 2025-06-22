// دالة لاستخراج معلومات الجروب من رابط الواتساب
async function fetchGroupInfo(whatsappLink) {
    try {
        // في الواقع، لا يمكن جلب بيانات الجروب مباشرة من الواتساب بسبب سياسة CORS
        // لذلك سنستخدم حل بديل بمعلومات افتراضية
        
        // يمكنك استبدال هذا الجزء بخدمة API إذا كنت تملك واحدة
        const groupId = whatsappLink.split('/').pop();
        
        return {
            name: `جروب ${groupId.substring(0, 5)}`,
            type: "نوع الجروب غير محدد",
            image: "https://via.placeholder.com/50/075e54/ffffff?text=WA"
        };
        
        // في حالة وجود API حقيقية:
        // const response = await fetch(`your-api-endpoint?url=${encodeURIComponent(whatsappLink)}`);
        // return await response.json();
    } catch (error) {
        console.error('Error fetching group info:', error);
        return {
            name: "جروب غير معروف",
            type: "غير محدد",
            image: "https://via.placeholder.com/50/cccccc/333333?text=WA"
        };
    }
}

// دالة لتحميل وعرض الجروبات
async function loadGroups() {
    const groupsList = document.getElementById('groupsList');
    
    try {
        // جلب ملف JSON الخارجي
        const response = await fetch('groups.json');
        const whatsappLinks = await response.json();
        
        // مسح رسالة التحميل
        groupsList.innerHTML = '';
        
        // تحميل كل جروب
        for (const link of whatsappLinks) {
            const groupInfo = await fetchGroupInfo(link);
            
            const groupElement = document.createElement('a');
            groupElement.href = link;
            groupElement.target = "_blank";
            groupElement.className = "group-banner";
            
            groupElement.innerHTML = `
                <div class="group-info">
                    <div class="group-name">${groupInfo.name}</div>
                    <div class="group-type">${groupInfo.type}</div>
                </div>
                <img src="${groupInfo.image}" alt="${groupInfo.name}" class="group-image">
            `;
            
            groupsList.appendChild(groupElement);
        }
    } catch (error) {
        console.error('Error loading groups:', error);
        groupsList.innerHTML = '<div class="error">حدث خطأ أثناء تحميل الجروبات</div>';
    }
}

// تحميل الجروبات عند فتح الصفحة
window.onload = loadGroups;

