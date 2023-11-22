import os

def run_yarn_startDev():
    os.chdir("diary-back-end")
    os.system("yarn run startDev")

if __name__ == "__main__":
    run_yarn_startDev()
