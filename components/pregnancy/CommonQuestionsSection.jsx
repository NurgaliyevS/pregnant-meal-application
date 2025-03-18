export default function CommonQuestionsSection({ weekNumber, months }) {
  return (
    <section className="card bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Common Questions About Week {weekNumber}</h2>
        
        <div className="space-y-4">
          <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" /> 
            <div className="collapse-title font-medium">
              Understanding pregnancy weeks vs. months
            </div>
            <div className="collapse-content"> 
              <p>Pregnancy weeks and calendar months don't align perfectly. While you're {weekNumber} weeks pregnant (approximately {months}), healthcare providers track pregnancy by weeks rather than months because it provides more accurate timing for developmental milestones and medical care. A pregnancy "month" is roughly 4.3 weeks, making the week count the more precise measurement.</p>
            </div>
          </div>
          
          <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" /> 
            <div className="collapse-title font-medium">
              What should I be feeling at {weekNumber} weeks pregnant?
            </div>
            <div className="collapse-content"> 
              {weekNumber <= 13 && (
                <p>At {weekNumber} weeks, you might be experiencing morning sickness, fatigue, breast tenderness, and frequent urination. Many women don't "look" pregnant yet, but your body is working hard to support your baby's development.</p>
              )}
              {weekNumber > 13 && weekNumber <= 27 && (
                <p>At {weekNumber} weeks, you're likely feeling more energetic than in the first trimester. You may have started to feel your baby move (called "quickening"), and your pregnancy is probably visible. Some women experience round ligament pain as the uterus grows.</p>
              )}
              {weekNumber > 27 && (
                <p>At {weekNumber} weeks, you might be feeling more uncomfortable with backaches, swollen ankles, and difficulty sleeping. Your baby's movements are stronger now, and you might experience Braxton Hicks contractions as your body prepares for labor.</p>
              )}
            </div>
          </div>
          
          <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" /> 
            <div className="collapse-title font-medium">
              What is my baby doing at {weekNumber} weeks?
            </div>
            <div className="collapse-content"> 
              {weekNumber <= 13 && (
                <p>At {weekNumber} weeks, your baby's major organs and body systems are forming. The heart is beating, and limb buds are developing into arms and legs. Facial features are beginning to take shape, and the neural tube is forming into the brain and spinal cord.</p>
              )}
              {weekNumber > 13 && weekNumber <= 27 && (
                <p>At {weekNumber} weeks, your baby can hear sounds, has developed fingerprints, and is practicing breathing movements. The eyes can open and close, and the baby is moving around quite a bit. All essential organs have formed and are continuing to mature.</p>
              )}
              {weekNumber > 27 && (
                <p>At {weekNumber} weeks, your baby is putting on weight and developing fat stores. The brain is developing rapidly, and the lungs are maturing in preparation for breathing air. Your baby is practicing sucking and swallowing and has periods of sleep and wakefulness.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 