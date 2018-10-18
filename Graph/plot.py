
# importing the required module
# import Tkinter
import matplotlib.pyplot as plt

color = 'black'
# y axis values
# Transaction Time
yWrite = [21, 24, 28, 32, 39, 68, 100, 119, 174, 205, 257, 261, 275, 344,
          349, 404, 451, 478, 509, 512, 528, 562, 596, 617, 643, 862, 986]

# Readin time Values
yRead = [14, 12, 17, 20, 26, 61, 80, 103, 142, 178, 197, 209, 223, 364,
         293, 342, 397, 354, 369, 472, 470, 509, 421, 549, 524, 733, 900]

# corresponding x axis values
x = [1, 2, 5, 10, 20, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
     550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000]

# print(len(x), len(y))
# plotting the points
# linestyle = ['-', ':']
plt.plot(x, yWrite, linestyle='-', color=color, linewidth=2)
plt.plot(x, yRead, linestyle=':', color=color, linewidth=3)
# naming the x axis
plt.xlabel('Number of users')
# naming the y axis
plt.ylabel('Transaction Time (milliseconds)')

# giving a title to my graph
plt.title('')

plt.legend(['Write Time', "ReadTime"], loc="lower right")
# function to show the plot
plt.show()
plt.savefig('No_of_users_vs_ReadingTime.eps', format='eps', dpi=600)
