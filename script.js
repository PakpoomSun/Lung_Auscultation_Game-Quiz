let currentPoint = 1;
let locked = false;

const instruction = document.getElementById("instruction");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const explanation = document.getElementById("explanation");

// ข้อความเฉลยของแต่ละตำแหน่ง
const explanations = {
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
};


// เมื่อคลิกจุด
document.querySelectorAll(".hotspot").forEach(hotspot => {

  hotspot.addEventListener("click", () => {

    if (locked) return;

    const clickedPoint = Number(hotspot.dataset.point);

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
      "✅ ถูกต้องค่ะ! ฟังที่ตำแหน่งนี้ของปอดทั้ง 2 ฝั่งค่ะ";

    feedback.className = "feedback correct";


    // แสดงหมายเลขเฉลยทั้งซ้ายและขวา
    document
      .querySelectorAll(`.answer-dot[data-point="${currentPoint}"]`)
      .forEach(dot => {

        dot.classList.add("show", "pulse");

      });


    // =========================
    // เพิ่มข้อความเฉลย
    // =========================

    const answerBox = document.createElement("div");

    answerBox.className = "explanation-item";

    answerBox.innerHTML = `
      <div class="answer-title">📍 เฉลย</div>
      <div>${explanations[currentPoint]}</div>
    `;

    // เพิ่มต่อท้าย โดยไม่ลบข้อความเดิม
    explanation.appendChild(answerBox);


    // อัปเดตความคืบหน้า
    progress.textContent =
      `ตำแหน่งที่เปิดแล้ว: ${currentPoint} / 5`;


    // =========================
    // ไปตำแหน่งต่อไป
    // =========================

    if (currentPoint < 5) {

      currentPoint++;

      setTimeout(() => {

        instruction.innerHTML =
          `กรุณาคลิกตำแหน่งที่ <strong>${currentPoint}</strong> — เลือกฝั่งใดก็ได้`;

        feedback.textContent = "";

        feedback.className = "feedback";

        locked = false;

      }, 1100);


    } else {

      // =========================
      // ครบทั้ง 5 ตำแหน่ง
      // =========================

      setTimeout(() => {

        instruction.innerHTML =
          "🎉 ทำครบทั้ง 5 ตำแหน่งแล้วค่ะ";

        feedback.textContent =
          "ให้ฟังเสียงความผิดปกติในตำแหน่งเดียวกันของปอดทั้ง 2 ข้าง โดยเรียงลำดับ จากตำแหน่งที่ 1 ไป ตำแหน่งที่ 5 นะคะ";

        feedback.className =
          "feedback correct";

        locked = false;

      }, 1100);

    }

  });

});