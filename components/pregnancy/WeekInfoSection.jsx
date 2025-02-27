export default function WeekInfoSection({ weekNumber }) {
  return (
    <section className="card bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Understanding Week {weekNumber}</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Baby Development</h3>
          {weekNumber <= 13 && (
            <p>
              During the first trimester, your baby's major organs and body systems are forming. 
              At {weekNumber} weeks, your baby's heart is beating, and limb buds are developing into arms and legs.
              Facial features are beginning to take shape, and the neural tube is forming into the brain and spinal cord.
            </p>
          )}
          {weekNumber > 13 && weekNumber <= 27 && (
            <p>
              At {weekNumber} weeks, your baby can hear sounds, has developed fingerprints, and is practicing breathing movements.
              The eyes can open and close, and the baby is moving around quite a bit. All essential organs have formed and are continuing to mature.
              You might start feeling movements, which is an exciting milestone in your pregnancy!
            </p>
          )}
          {weekNumber > 27 && (
            <p>
              At {weekNumber} weeks, your baby is putting on weight and developing fat stores. The brain is developing rapidly,
              and the lungs are maturing in preparation for breathing air. Your baby is practicing sucking and swallowing
              and has periods of sleep and wakefulness. The baby is getting ready for life outside the womb!
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Your Body This Week</h3>
          {weekNumber <= 13 && (
            <p>
              At {weekNumber} weeks, you might be experiencing morning sickness, fatigue, breast tenderness, and frequent urination.
              Many women don't "look" pregnant yet, but your body is working hard to support your baby's development.
              Take care of yourself by getting plenty of rest and staying hydrated.
            </p>
          )}
          {weekNumber > 13 && weekNumber <= 27 && (
            <p>
              At {weekNumber} weeks, you're likely feeling more energetic than in the first trimester.
              You may have started to feel your baby move (called "quickening"), and your pregnancy is probably visible.
              Some women experience round ligament pain as the uterus grows. Your skin may also be changing with the pregnancy glow!
            </p>
          )}
          {weekNumber > 27 && (
            <p>
              At {weekNumber} weeks, you might be feeling more uncomfortable with backaches, swollen ankles, and difficulty sleeping.
              Your baby's movements are stronger now, and you might experience Braxton Hicks contractions as your body prepares for labor.
              Your center of gravity has shifted, so be careful with your movements to prevent falls.
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 