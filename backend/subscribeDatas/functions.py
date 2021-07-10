import pandas as pd
from .models import SubscribeIndex

# load default category and subscription title
def load_sublist_data():
    if SubscribeIndex.objects.all().count() == 0:
        # load data file
        sub_df = pd.read_excel('static/subsinfo.xlsx', engine='openpyxl')
        sub_list = list(sub_df['title'])
        # sub_list = list(map(tuple, sub_df.to_numpy())) # [ (category, title) ]

        # save data to DB
        for s_name in sub_list:
            subs_obj = SubscribeIndex(s_name=s_name)
            subs_obj.save()