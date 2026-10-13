class Solution:
    def maxAlternatingSum(self, nums: list[int]) -> int:
        squares = sorted([x**2 for x in nums])
        split = len(nums) // 2
        return sum(squares[split:]) - sum(squares[:split]) 
                