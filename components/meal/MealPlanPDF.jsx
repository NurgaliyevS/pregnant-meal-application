import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#570DF8",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
  },
  daySection: {
    marginBottom: 30,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 10,
  },
  dayNumber: {
    backgroundColor: '#570DF8',
    color: 'white',
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  mealGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  mealCard: {
    width: '30%',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  mealImage: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
  },
  mealContent: {
    padding: 10,
  },
  mealTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mealDescription: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 10,
    color: '#64748b',
  },
});

function MealPlanPDF({ mealPlanStructured }) {
    console.log(mealPlanStructured, 'meal plan')

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Weekly Meal Plan</Text>
          <Text style={styles.subtitle}>A personalized 7-day meal plan designed for your needs</Text>
        </View>

        {mealPlanStructured.map((dayMeals, dayIndex) => (
          <View key={dayIndex} style={styles.daySection}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayNumber}>Day {dayIndex + 1}</Text>
              <Text style={styles.subtitle}>{dayMeals.length} meals planned</Text>
            </View>

            <View style={styles.mealGrid}>
              {dayMeals.map((meal, mealIndex) => (
                <View key={mealIndex} style={styles.mealCard}>
                  {meal.imageUrl && (
                    <Image
                      src={meal.imageUrl}
                      style={styles.mealImage}
                    />
                  )}
                  <View style={styles.mealContent}>
                    <Text style={styles.mealTitle}>{meal.title}</Text>
                    <Text style={styles.mealDescription}>{meal.description}</Text>
                    <Text style={styles.ingredients}>
                      Ingredients: {meal.ingredients}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default MealPlanPDF;