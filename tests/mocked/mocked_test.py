import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import database_check_mock, print_users_mock
from app import Person

#constants
KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INIT_CHECK = ('me','playerg@abc.com', 0, 0, 0, 0)

class TestCases(unittest.TestCase):  
    def setUp(self):
        
        self.print_params = [{
            KEY_EXPECTED: [['me', 0, 0, 0, 0]]
        }]
        
        self.check_params = [{
            KEY_INPUT: ('me', 'playerg@abc.com'),
            KEY_EXPECTED: 'me'
        }]
        
        initial_person = Person(
            username=INIT_CHECK[0], 
            email=INIT_CHECK[1], 
            win=INIT_CHECK[2], 
            loss=INIT_CHECK[3], 
            tie=INIT_CHECK[4], 
            rank=INIT_CHECK[5]
        )
        
        self.initial_db_mock = [initial_person]

    def mocked_db_session_add(self, username):
        '''mocks the addition to the user list'''
        self.initial_db_mock.append(username)

    def mocked_db_session_commit(self):
        '''acts like the DB commit function is there, but actually does nothing'''
        pass
    
    def mocked_query_first(self):
        return self.initial_db_mock[0]
        
    def mocked_query_all(self):
        return self.initial_db_mock
        
    def test_print_success(self):
        for test in self.print_params:
            with patch('app.Person.query') as mocked_query:
                mocked_query.all = self.mocked_query_all
            
                actual_result = print_users_mock()
                expected_result = test[KEY_EXPECTED]

                self.assertEqual(len(actual_result), len(expected_result))
                self.assertEqual(actual_result, expected_result)


    def test_check_success(self):
        for test in self.check_params:
            with patch('app.Person.query') as mocked_query:
                mocked_query.first = self.mocked_query_first
                with patch('app.DB.session.add', self.mocked_db_session_add):
                    with patch('app.DB.session.commit', self.mocked_db_session_commit):
                
                        actual_result = database_check_mock(test[KEY_INPUT][0], test[KEY_INPUT][1])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        print(expected_result)

                        self.assertEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()