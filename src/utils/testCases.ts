interface ITestCase {
  [k: string]: { [k: string]: string };
}

export const testCases: ITestCase = {
  sumTwo: {
    test: `
  //inject
  describe("testFunc", () => {
    it("should return 4 if given 2 and 2", () => {
      expect(mod.testCode(2, 2)).toEqual(4);
    });
    it("should return 99 if given 33 and 66", () => {
      expect(mod.testCode(33, 66)).toEqual(99);
    });
    it("should return 27 if given 13 and 14", () => {
      expect(mod.testCode(13, 14)).toEqual(27);
    });
  });
      `,
  },
  multiplyTwo: {
    test: `
  //inject
  describe("testFunc", () => {
    it("should return 4 if given 2 and 2", () => {
      expect(mod.testCode(2, 2)).toEqual(4);
    });
    it("should return 18 if given 6 and 3", () => {
      expect(mod.testCode(6, 3)).toEqual(18);
    });
  });
  
      `,
  },
  lastWordLength: {
    test: `
   //inject
      describe("Length of the Last word", () => {
        it('should return 3 when given "Hello my name is Dan" ', () => {
          const testCase = "Hello my name is Dan";
          expect(mod.testCode(testCase)).toEqual(3);
        });
        it('should return 7 when given "I    need 2 for   Tuesday       "', () => {
          const testCase = "I    need 2 for   Tuesday       ";
          expect(mod.testCode(testCase)).toEqual(7);
        });
        it('should return 4 when given "Spaces and dots..."', () => {
          const testCase = "Spaces and dots...";
          expect(mod.testCode(testCase)).toEqual(4);
        });
      
        it("should return 1 when given a single letter", () => {
          const testCase = "a";
          expect(mod.testCode(testCase)).toEqual(1);
        });
      });
      `,
  },
  pascalsTriangle: {
    test: `
      //inject
      describe("Pascal's Triangle", () => {
        it("should return an array of x arrays, when given the input x", () => {
          const testCase = 5;
          expect(mod.testCode(testCase)).toHaveLength(testCase);
        });
      
        it("should have a third row equal to [1, 2, 1] when give an input > 2", () => {
          const testCase = 4;
          expect(mod.testCode(testCase)[2]).toEqual([1, 2, 1]);
        });
      
        it("should have a fifth row equal to [1, 4, 6, 4, 1] when give an input > 4", () => {
          const testCase = 5;
          expect(mod.testCode(testCase)[4]).toEqual([1, 4, 6, 4, 1]);
        });
      });
      `,
  },
  mostFrequent: {
    test: `
      //inject
      describe("Most frequent letter", () => {
        it("should return an array containing the most frequent letter", () => {
          const testCase = "hello world";
          expect(mod.testCode(testCase)).toHaveLength(1);
        });
      
        it('should return ["l"] when given the input "Hello World"', () => {
          const testCase = "Hello World";
          expect(mod.testCode(testCase)).toEqual(["l"]);
        });
      
        it("should return an array with multiple characters if they have the same frequency", () => {
          const testCase = "hello worldo";
          expect(mod.testCode(testCase)).toEqual(["l", "o"]);
        });
      
        it("should ignore casing", () => {
          const testCase = "heLlo worldo";
          expect(mod.testCode(testCase)).toEqual(["l", "o"]);
        });
      });
      `,
  },
};
