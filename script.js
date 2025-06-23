async function fetchGroupInfo(whatsappLink) {
    try {
        // استخراج معرف الجروب من الرابط
        const groupId = whatsappLink.split('/').pop();
        
        // إنشاء صورة الجروب بناءً على المعرف (حل بديل)
        const groupImage = `https://api.multiavatar.com/${groupId}.png`;
        
        return {
            name: `جروب ${groupId.substring(0, 6)}`,
            type: "انقر للانضمام",
            image: groupImage
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            name: "جروب واتساب",
            type: "انقر للانضمام",
            image: "https://cdn-icons-png.flaticon.com/512/124/124034.png"
        };
    }
}

async function loadGroups() {
    const groupsList = document.getElementById('groupsList');
    
    try {
        const response = await fetch('groups.json');
        if (!response.ok) throw new Error('Failed to load groups');
        
        const whatsappLinks = await response.json();
        groupsList.innerHTML = '';
        
        for (const link of whatsappLinks) {
            const groupInfo = await fetchGroupInfo(link);
            
            const groupElement = document.createElement('a');
            groupElement.href = link;
            groupElement.className = "group-banner";
            groupElement.target = "_blank";
            groupElement.rel = "noopener noreferrer";
            
            groupElement.innerHTML = `
                <div class="group-image-container">
                    <img src="${groupImage}" alt="${groupInfo.name}" class="group-image" 
                         onerror="this.src='https://cdn-icons-png.flaticon.com/512/124/124034.png'">
                </div>
                <div class="group-info">
                    <h3 class="group-name">${groupInfo.name}</h3>
                    <p class="group-type">${groupInfo.type}</p>
                </div>
                <i class="fas fa-arrow-left join-icon"></i>
            `;
            
            groupsList.appendChild(groupElement);
        }
    } catch (error) {
        console.error('Error:', error);
        groupsList.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>حدث خطأ في تحميل الجروبات</p>
                <button onclick="location.reload()">إعادة المحاولة</button>
            </div>
        `;
    }
}

window.addEventListener('DOMContentLoaded', loadGroups);
