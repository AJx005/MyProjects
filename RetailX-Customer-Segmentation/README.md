# RetailX Customer Segmentation & Predictive Analytics

A business analytics and machine learning project that uses customer behaviour and demographic data to identify actionable customer segments and predict segment membership for new customers.

## Project Goal

In the **RetailX university coursework scenario**, the goal was to turn customer data into more useful targeted marketing decisions. The project combines **unsupervised learning** and **supervised learning**:

1. **K-Means clustering** discovers natural customer groups.
2. **Segment profiling** explains how those groups differ in purchasing and engagement behaviour.
3. A **Decision Tree classifier** predicts the cluster of new customers.
4. The findings are translated into **marketing recommendations** for each segment.

## What This Project Demonstrates

- Preparing and standardising customer data for clustering
- Applying the **Elbow Method** and **K-Means** segmentation
- Interpreting clusters from a business perspective
- Training and evaluating an interpretable **Decision Tree** model
- Turning analytical findings into practical marketing actions

## Tech Stack

- Python
- pandas
- scikit-learn
- matplotlib
- seaborn
- Google Colab

## Modeling Workflow

`Customer data → feature selection → StandardScaler → Elbow Method → K-Means (k=3) → segment profiling → Decision Tree → business recommendations`

The cleaned portfolio notebook uses **14 demographic and behavioural predictors** after excluding the customer identifier, ZIP code and the original segment field.

## Customer Segments

| Segment | Profile | Key characteristics | Business opportunity |
| --- | --- | --- | --- |
| **Cluster 0 — Frequently Engaged Customers** | Active, multi-category and multichannel shoppers | Avg. order frequency **3.92**, cross-buy **4.49**, multichannel usage **2.20**, marketing count **28.34** | Cross-sell bundles, loyalty rewards and consistent multichannel campaigns |
| **Cluster 1 — Loyal Premium Customers** | Long-standing, higher-income customers | Avg. income **96.46**, tenure **32.85**, order frequency **1.49**, per-sale ratio **0.35** | VIP benefits, retention and selective personalised communication |
| **Cluster 2 — Big-Ticket Newcomers** | High-value but infrequent newer shoppers | Avg. order size **37.71**, order frequency **0.73**, tenure **8.07**, multichannel usage **1.26** | Onboarding and re-engagement aimed at increasing repeat purchases |

## Predictive Model

A `DecisionTreeClassifier(max_depth=5, random_state=42)` was trained using an **80/20 train-test split** to predict the K-Means segment of a customer.

**Test accuracy from the submitted notebook: 87.25%**

```text
Confusion Matrix
[[ 64   6  20]
 [  5  83   5]
 [  9   6 202]]
```

The project report highlights behavioural measures such as average order size, purchase frequency, tenure, cross-category buying, marketing exposure and channel usage as useful signals for differentiating the customer groups.

## Business Recommendations

**Cluster 0:** deepen engagement with cross-category bundles, loyalty programmes and frequent multichannel promotions.

**Cluster 1:** focus on retention and relationship value through VIP benefits, early access and lower-frequency personalised communication.

**Cluster 2:** use onboarding, re-engagement offers and direct/mobile-first communication to turn large but infrequent purchases into repeat behaviour.

## Limitations & Next Steps

The original project report identified several ways the analysis could be extended:

- Re-cluster periodically to capture changes in customer behaviour.
- Benchmark the Decision Tree against Random Forest or XGBoost.
- Validate the customer segments with real campaign or A/B testing.
- Add richer features such as RFM and customer lifetime value.
- Monitor movement between customer segments over time.

## Run the Notebook

The original project uses an Excel file named `RetailX.xlsx`. The dataset is **not included in this public portfolio repository**. To rerun the analysis, place an authorised copy of `RetailX.xlsx` in the notebook working directory and install the packages in `requirements.txt`.

Open: [`RetailX_Customer_Segmentation.ipynb`](./RetailX_Customer_Segmentation.ipynb)

---

**Project context:** Big Data & Analytics coursework — University of Europe for Applied Sciences, Dubai.
