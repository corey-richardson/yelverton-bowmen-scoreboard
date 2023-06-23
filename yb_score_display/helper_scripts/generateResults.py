# Get top scores from scores.csv by category, save to individual .csv files

def grouper(grouped_data, name):
    lst = grouped_data.get_group(name).head(N_WINNERS)
    return lst.head(N_WINNERS).reset_index()

import pandas as pd

N_WINNERS = 3

PATH = "static/scores.csv"
score_data = pd.read_csv(PATH)
score_data = score_data.sort_values(by=["score"], ascending=False)

overalls = score_data.head(N_WINNERS).reset_index()
overalls.to_csv("static/winners/overall.csv", index=False)

age_grouped = score_data.groupby(score_data.age_category)
seniors = grouper(age_grouped, "Senior")
seniors.to_csv("static/winners/seniors.csv", index=False)
juniors = grouper(age_grouped, "Junior")
juniors.to_csv("static/winners/juniors.csv", index=False)
    
sex_grouped = score_data.groupby(score_data.sex)
gents = grouper(sex_grouped, "Gents")
gents.to_csv("static/winners/gents.csv", index=False)
ladies = grouper(sex_grouped, "Ladies")
ladies.to_csv("static/winners/ladies.csv", index=False)

grouped = score_data.groupby(["sex", "age_category"]).count()
grouped.to_csv("static/winners/grouped.csv", index=False)

