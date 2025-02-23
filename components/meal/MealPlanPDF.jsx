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
    break: "inside",
    breakInside: "avoid",
  },
  dayTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: "#570DF8",
    paddingBottom: 10,
    borderBottom: 1,
    borderColor: "#e2e8f0",
  },
  meal: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
  },
  mealHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  mealType: {
    backgroundColor: "#570DF8",
    color: "white",
    padding: 5,
    borderRadius: 4,
    marginRight: 10,
    fontSize: 10,
  },
  mealTitle: {
    fontSize: 14,
    flex: 1,
    paddingTop: 3,
  },
  mealDescription: {
    marginBottom: 8,
    color: "#64748b",
  },
  ingredientsTitle: {
    marginBottom: 4,
  },
  ingredients: {
    color: "#64748b",
  },
  mealImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    marginBottom: 10,
    borderRadius: 4,
  },
});

function MealPlanPDF({ mealPlanStructured, mealImages }) {
  console.log(mealImages, "mealImages");
  console.log(mealPlanStructured, "meal plans");

  // Helper function to find image URL
  const findMealImage = (meal) => {
    // First check if the meal object has imageUrl
    if (meal.imageUrl) {
      return meal.imageUrl;
    }
    
    // If no direct imageUrl, check in mealImages array
    if (mealImages) {
      const mealImage = mealImages.find(img => img.mealTitle === meal.title);
      return mealImage?.imageUrl || null;
    }

    return null;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Weekly Meal Plan</Text>
          <Text style={styles.subtitle}>
            A personalized 7-day meal plan designed for your needs
          </Text>
        </View>

        {mealPlanStructured.map((dayMeals, dayIndex) => (
          <View key={dayIndex} style={styles.daySection} wrap={false}>
            <Text style={styles.dayTitle}>Day {dayIndex + 1}</Text>

            {dayMeals.map((meal, mealIndex) => {
              const imageUrl = findMealImage(meal);

              return (
                <View key={mealIndex} style={styles.meal} wrap={false}>
                  <View style={styles.mealHeader}>
                    <Text style={styles.mealType}>{meal.type}</Text>
                    <Text style={styles.mealTitle}>{meal.title}</Text>
                  </View>

                  {imageUrl && (
                    <Image src={imageUrl} style={styles.mealImage} />
                  )}

                  <Text style={styles.mealDescription}>{meal.description}</Text>

                  <Text style={styles.ingredientsTitle}>Ingredients:</Text>
                  <Text style={styles.ingredients}>{meal.ingredients}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default MealPlanPDF;
