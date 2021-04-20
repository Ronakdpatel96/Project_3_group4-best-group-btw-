import os
import sys
import unittest
import unittest.mock as mock

sys.path.append(os.path.abspath('../../'))
from app import add_rank_statement

RANK_INPUT = "rank"
EXPECTED_OUTPUT = "expected"

class AddStatement(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                RANK_INPUT: 5,
                EXPECTED_OUTPUT: "Got a few wins to your name"
            },
            {
                RANK_INPUT: 18,
                EXPECTED_OUTPUT: "Getting really good at the game now"
            },
            {
                RANK_INPUT: 43,
                EXPECTED_OUTPUT: "You are a champion!"
            },

        ]
        
    def test_add_statement(self):
        for test in self.success_test_params:
            # Actual result is the same input list, since the function modifies it
            actual_result = add_rank_statement(test[RANK_INPUT])
            
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
            
if __name__ == '__main__':
    unittest.main()