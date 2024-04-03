# Remove personal data for upload to GitHub repo

import pandas as pd

email_sanitiser = lambda x: "" if x == "" else "email@domain.com"
phone_sanitiser = lambda x: "" if x == "" else "XXXXX XXXXXX"

def sanitise(fname):
    df = pd.read_csv(fname, index_col=False)
    df["email"] = df["email"].apply(email_sanitiser)
    df["phone_num"] = df["phone_num"].apply(phone_sanitiser)
    df.to_csv(fname, index=False)

sanitise("static/scores.csv")

sanitise("static/winners/gents.csv")
sanitise("static/winners/grouped.csv")
sanitise("static/winners/juniors.csv")
sanitise("static/winners/ladies.csv")
sanitise("static/winners/overall.csv")
sanitise("static/winners/seniors.csv")


