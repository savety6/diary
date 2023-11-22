import os

def run_expo_start():
    os.chdir("diary-ui")
    os.system("npx expo start --web")

if __name__ == "__main__":
    run_expo_start()
