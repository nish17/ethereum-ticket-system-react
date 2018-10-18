
# importing the required module
# import Tkinter
import matplotlib.pyplot as plt

# x axis values
y = [21, 24, 28, 32, 39, 68, 100, 119, 174, 205, 257, 261, 275, 344,
     349, 404, 451, 478, 509, 512, 528, 562, 596, 617, 643, 862, 986]
# corresponding y axis values
x = [1, 2, 5, 10, 20, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
     550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000]

print(len(x), len(y))
# plotting the points
plt.plot(x, y)

# naming the x axis
plt.xlabel('Number of users')
# naming the y axis
plt.ylabel('Transaction time (milliseconds)')

# giving a title to my graph
plt.title('')

# function to show the plot
plt.show()
plt.savefig('No_of_users_vs_TransactionTime.eps', format='eps', dpi=600)
