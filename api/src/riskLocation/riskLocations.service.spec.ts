import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import {
  PointLocation,
  RiskLocation,
  RiskLocationDocument,
} from './schemas/riskLocation.schema';
import { RiskLocationsService } from './riskLocations.service';
import { FakeModel } from '../helpers/fakeModel.helper';
import { UsersService } from '../users/users.service';

const riskLocations: RiskLocationDocument[] = [
  {
    location: new PointLocation({
      lat: 12,
      long: 34,
    }),
    risk: 'Risk 1 title',
    description: 'Risk 1 description',
    created_by: 'user_id' as any,
  } as RiskLocationDocument,
  {
    location: new PointLocation({
      lat: 43,
      long: 21,
    }),
    risk: 'Risk 2 title',
    description: 'Risk 2 description',
    created_by: 'user_id' as any,
  } as RiskLocationDocument,
];

describe('RiskLocationsService', () => {
  let riskLocationsService: RiskLocationsService;
  let usersService: UsersService;
  let riskLocationsModel: Model<RiskLocationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RiskLocationsService,
        {
          provide: getModelToken(RiskLocation.name),
          useValue: new FakeModel<RiskLocation>(),
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    riskLocationsService =
      module.get<RiskLocationsService>(RiskLocationsService);
    usersService = module.get<UsersService>(UsersService);
    riskLocationsModel = module.get<Model<RiskLocationDocument>>(
      getModelToken(RiskLocation.name),
    );
  });

  it('should be defined', () => {
    expect(riskLocationsService).toBeDefined();
    expect(riskLocationsModel).toBeDefined();
  });

  describe('create', () => {
    it('should create a new riskLocation with location, risk, description and created_by.', async () => {
      const result = await riskLocationsService.create({
        ...riskLocations[0],
        coords: {
          lat: riskLocations[0].location.coordinates[0],
          long: riskLocations[0].location.coordinates[1],
        },
        created_by: 'user_id',
      });

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('location');
      expect(result).toHaveProperty('risk');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('created_by');
    });

    it('should not be able to create a riskLocation without a valid user id', async () => {
      jest
        .spyOn(usersService, 'findById')
        .mockRejectedValueOnce(new NotFoundException('User not found'));

      const createFunc = jest.spyOn(riskLocationsModel, 'create');

      expect(
        riskLocationsService.create({
          ...riskLocations[0],
          coords: {
            lat: riskLocations[0].location.coordinates[0],
            long: riskLocations[0].location.coordinates[1],
          },
          created_by: 'non_user_id',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(createFunc).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it("should be able to update riskLocation's info", async () => {
      const riskLocation = await riskLocationsService.create({
        ...riskLocations[0],
        coords: {
          lat: riskLocations[0].location.coordinates[0],
          long: riskLocations[0].location.coordinates[1],
        },
        created_by: 'user_id',
      });

      const result = await riskLocationsService.update(riskLocation._id, {
        risk: 'New Risk 1 title',
        description: riskLocations[0].description,
        coords: {
          lat: riskLocations[0].location.coordinates[0],
          long: riskLocations[0].location.coordinates[1],
        },
      });

      expect(result.risk).toEqual('New Risk 1 title');
    });
  });

  describe('delete', () => {
    it('should be able to delete a riskLocation', async () => {
      const riskLocation = await riskLocationsService.create({
        ...riskLocations[0],
        coords: {
          lat: riskLocations[0].location.coordinates[0],
          long: riskLocations[0].location.coordinates[1],
        },
        created_by: 'user_id',
      });

      const riskLocationsBeforeDeletion = await riskLocationsService.findAll();
      expect(riskLocationsBeforeDeletion.length).toBe(1);

      await expect(
        riskLocationsService.delete(riskLocation._id),
      ).resolves.not.toThrow();

      const riskLocationsAfterDeletion = await riskLocationsService.findAll();
      expect(riskLocationsAfterDeletion.length).toBe(0);
    });
  });

  describe('findAll', () => {
    it('should return a list of riskLocations.', async () => {
      const allRiskLocations = await Promise.all(
        riskLocations.map((riskLocation) =>
          riskLocationsService.create({
            ...riskLocation,
            coords: {
              lat: riskLocations[0].location.coordinates[0],
              long: riskLocations[0].location.coordinates[1],
            },
            created_by: 'user_id',
          }),
        ),
      );

      const result = await riskLocationsService.findAll();

      expect(result).toEqual(allRiskLocations);
    });
  });

  describe('findById', () => {
    it('should be able to find a riskLocation by his id', async () => {
      const allRiskLocations = await Promise.all(
        riskLocations.map((riskLocation) =>
          riskLocationsService.create({
            ...riskLocation,
            coords: {
              lat: riskLocations[0].location.coordinates[0],
              long: riskLocations[0].location.coordinates[1],
            },
            created_by: 'user_id',
          }),
        ),
      );

      const riskLocation = await riskLocationsService.findById(
        allRiskLocations[0]._id,
      );

      expect(riskLocation).toEqual(allRiskLocations[0]);
    });

    it('should not be able to find an non-existent riskLocation', async () => {
      await expect(
        riskLocationsService.findById('non-existent riskLocation id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findNearTo', () => {
    it('should be able to list riskLocation in a radius', async () => {
      const allRiskLocations = await Promise.all(
        riskLocations.map((riskLocation) =>
          riskLocationsService.create({
            ...riskLocation,
            coords: {
              lat: riskLocations[0].location.coordinates[0],
              long: riskLocations[0].location.coordinates[1],
            },
            created_by: 'user_id',
          }),
        ),
      );

      jest
        .spyOn(riskLocationsModel, 'find')
        .mockResolvedValueOnce([allRiskLocations[0]]);

      const foundRiskLocations = await riskLocationsService.findNearTo({
        coords: [
          riskLocations[0].location.coordinates[0],
          riskLocations[0].location.coordinates[1],
        ].join(','),
        radius: '1000',
      });

      expect(foundRiskLocations).toEqual([allRiskLocations[0]]);
    });
  });
});
