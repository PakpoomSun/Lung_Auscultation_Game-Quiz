let currentRound = 1;
let currentPoint = 1;
let locked = false;

const lungImage = document.getElementById("lungImage");
const lungArea = document.getElementById("lungArea");
const roundTitle = document.getElementById("roundTitle");
const instruction = document.getElementById("instruction");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const explanation = document.getElementById("explanation");
const startRound2 = document.getElementById("startRound2");

const roundData = {
  1: {
    total: 5,
    image: "Lung.png",
    title: "รอบที่ 1: ระบุตำแหน่งการฟังเสียงปอดด้านหน้า",
    firstInstruction: "กรุณาคลิกตำแหน่งที่ <strong>1</strong> — เลือกฝั่งใดก็ได้",
    doneInstruction: "🎉 ทำครบทั้ง 5 ตำแหน่งแล้วค่ะ",
    doneMessage: "พร้อมเข้าสู่รอบที่ 2 ซึ่งเป็นการตรวจตำแหน่งการฟังเสียงปอดด้านหลังค่ะ",
    explanations: {
      1: `
        <strong>ตำแหน่งที่ 1 (Supra-clavicular)</strong>:
        เหนือกระดูกไหปลาร้า ฟังเสียงส่วนยอดปอด (Apices)
      `,
      2: `
        <strong>ตำแหน่งที่ 2 (2nd Intercostal Space)</strong>:
        ช่องซี่โครงที่ 2 ใต้กระดูกไหปลาร้า ฟังกลีบปอดส่วนบน (Upper lobes)
      `,
      3: `
        <strong>ตำแหน่งที่ 3 (4th Intercostal Space)</strong>:
        ช่องซี่โครงที่ 4 ฟังบริเวณปอดส่วนกลาง
        (Middle lobe ทางด้านขวา และ Upper lobe ทางด้านซ้าย)
      `,
      4: `
        <strong>ตำแหน่งที่ 4 (Lower anterior)</strong>:
        บริเวณช่องซี่โครงที่ 5 แนวข้างลำตัว (Mid-axillary line)
      `,
      5: `
        <strong>ตำแหน่งที่ 5 (Mid-axillary)</strong>:
        บริเวณช่องซี่โครงที่ 6 แนวข้างลำตัว (Mid-axillary line)
        เพื่อฟังกลีบปอดส่วนล่าง (Lower lobes)
      `
    }
  },

  2: {
    total: 7,
    image: "Lung_Posterior.png",
    title: "รอบที่ 2: ระบุตำแหน่งการฟังเสียงปอดด้านหลัง",
    firstInstruction: "กรุณาคลิกตำแหน่งที่ <strong>1</strong> — เลือกฝั่งใดก็ได้",
    doneInstruction: "🎉 ทำครบทั้ง 7 ตำแหน่งแล้วค่ะ",
    doneMessage: "ยอดเยี่ยมค่ะ! รอบที่ 2 เสร็จสมบูรณ์แล้ว",
    explanations: {
      1: `
        <strong>ตำแหน่งที่ 1 (Apex / เหนือสะบัก)</strong>:
        บริเวณเหนือกระดูกสะบัก ใช้ฟังเสียงบริเวณยอดปอด (Apices) ทั้งซ้ายและขวา
      `,
      2: `
        <strong>ตำแหน่งที่ 2 (ระหว่างสะบักกับกระดูกสันหลัง ระดับบน)</strong>:
        บริเวณระหว่างสะบักกับแนวกระดูกสันหลังส่วนบน ใช้ประเมินเสียงบริเวณกลีบปอดส่วนบน (Upper lobes)
      `,
      3: `
        <strong>ตำแหน่งที่ 3 (ระหว่างสะบักกับกระดูกสันหลัง ระดับกลาง)</strong>:
        บริเวณระหว่างสะบักกับแนวกระดูกสันหลังระดับกลาง ใช้ประเมินเสียงบริเวณปอดส่วนกลาง
      `,
      4: `
        <strong>ตำแหน่งที่ 4 (กึ่งกลางหลังระดับล่าง)</strong>:
        บริเวณกึ่งกลางหลังระดับล่าง เป็นตำแหน่งสำหรับประเมินเสียงปอดส่วนล่าง
      `,
      5: `
        <strong>ตำแหน่งที่ 5 (Axillary / Mid-axillary)</strong>:
        บริเวณข้างลำตัวใต้รักแร้
        ด้านขวาสัมพันธ์กับบริเวณ Right Middle Lobe และด้านซ้ายสัมพันธ์กับ Left Upper Lobe/Lingula
      `,
      6: `
        <strong>ตำแหน่งที่ 6 (Infrascapular)</strong>:
        บริเวณใต้กระดูกสะบัก ใช้ประเมินเสียงบริเวณกลีบปอดส่วนล่าง (Lower lobes)
      `,
      7: `
        <strong>ตำแหน่งที่ 7 (ฐานปอดส่วนล่างสุด)</strong>:
        บริเวณฐานปอดส่วนล่างสุด ใช้ประเมินเสียงปอดบริเวณ Lung bases
      `
    }
  }
};

function setRound(roundNumber) {
  currentRound = roundNumber;
  currentPoint = 1;
  locked = false;

  const data = roundData[currentRound];

  lungImage.src = data.image;
  lungImage.alt = currentRound === 1
    ? "ภาพปอดด้านหน้า"
    : "ภาพปอดด้านหลัง";

  lungArea.classList.remove("round1", "round2");
  lungArea.classList.add(`round${currentRound}`);

  roundTitle.textContent = data.title;

  instruction.innerHTML = data.firstInstruction;
  feedback.textContent = "";
  feedback.className = "feedback";

  progress.textContent =
    `ตำแหน่งที่เปิดแล้ว: 0 / ${data.total}`;

  explanation.innerHTML = "";

  document.querySelectorAll(".answer-dot").forEach(dot => {
    dot.classList.remove("show", "pulse");
  });

  document.querySelectorAll(".hotspot").forEach(hotspot => {
    hotspot.disabled = false;
    hotspot.style.pointerEvents = "auto";
  });

  startRound2.style.display = currentRound === 1 ? "none" : "none";
}

function handleClick(hotspot) {
  if (locked) return;

  const clickedPoint = Number(hotspot.dataset.point);
  const data = roundData[currentRound];

  // =========================
  // ตอบผิด
  // =========================
  if (clickedPoint !== currentPoint) {
    feedback.textContent = "❌ ผิดค่ะ ลองใหม่อีกครั้งนะคะ";
    feedback.className = "feedback wrong";
    return;
  }

  // =========================
  // ตอบถูก
  // =========================
  locked = true;

  feedback.textContent =
    `✅ ถูกต้องค่ะ! ฟังที่ตำแหน่งนี้ของปอดทั้ง 2 ฝั่งค่ะ`;
  feedback.className = "feedback correct";

  // แสดงหมายเลขเฉลยทั้งซ้ายและขวา
  document
    .querySelectorAll(`.round${currentRound}-dot[data-point="${currentPoint}"]`)
    .forEach(dot => {
      dot.classList.add("show", "pulse");
    });

  // เพิ่มคำอธิบายและเก็บสะสมไว้
  const answerBox = document.createElement("div");
  answerBox.className = "explanation-item";

  answerBox.innerHTML = `
    <div class="answer-title">📍 เฉลยตำแหน่งที่ ${currentPoint}</div>
    <div>${data.explanations[currentPoint]}</div>
  `;

  explanation.appendChild(answerBox);

  progress.textContent =
    `ตำแหน่งที่เปิดแล้ว: ${currentPoint} / ${data.total}`;

  // =========================
  // ไปตำแหน่งต่อไป
  // =========================
  if (currentPoint < data.total) {

    currentPoint++;

    setTimeout(() => {
      instruction.innerHTML =
        `กรุณาคลิกตำแหน่งที่ <strong>${currentPoint}</strong> — เลือกฝั่งใดก็ได้`;

      feedback.textContent = "";
      feedback.className = "feedback";
      locked = false;
    }, 900);

  } else {

    // =========================
    // จบรอบ
    // =========================
    setTimeout(() => {

      instruction.innerHTML = data.doneInstruction;

      feedback.textContent = data.doneMessage;
      feedback.className = "feedback correct";

      locked = true;

      if (currentRound === 1) {
        startRound2.style.display = "inline-block";
      }

    }, 900);
  }
}

// ผูกปุ่มทั้งหมด
document.querySelectorAll(".hotspot").forEach(hotspot => {
  hotspot.addEventListener("click", () => {
    const hotspotRound =
      hotspot.classList.contains("round2-hotspot") ? 2 : 1;

    // ไม่ให้จุดของอีกรอบทำงาน
    if (hotspotRound !== currentRound) return;

    handleClick(hotspot);
  });
});

// เริ่มรอบที่ 2
startRound2.addEventListener("click", () => {
  setRound(2);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// เริ่มต้นรอบที่ 1
setRound(1);
