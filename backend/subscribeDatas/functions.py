import pandas as pd
from .models import SubscribeListData

# load default category and subscription title
def load_sublist_data():
    # load data file
    sub_df = pd.read_excel('static/subsinfo.xlsx')
    sub_list = list(map(tuple, sub_df.to_numpy())) # [ (category, title) ]

    # save data to DB
    for category, title in sub_list:
        subs_obj = SubscribeListData(category=category, title=title)
        subs_obj.save()
    
            
