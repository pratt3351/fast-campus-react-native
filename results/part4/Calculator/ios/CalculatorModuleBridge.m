//
//  CalculatorModuleBridge.m
//  Calculator
//
//  Created by Pratt Yeon on 2022/12/10.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalculatorModule, NSObject)

RCT_EXTERN_METHOD(executeCalc: (NSString *) action
                  numberA: (int) numberA
                  numberB: (int) numberB
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejector: (RCTPromiseRejectBlock) reject
                  )

@end
